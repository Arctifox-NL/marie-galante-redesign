import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const PRICE_ADULT_CENTS = 3600;
const PRICE_CHILD_CENTS = 2900;
const SLOT_CAPACITY = 36;

export type AvailableSlot = {
  id: string;
  starts_at: string;
  ends_at: string;
  capacity: number;
  min_bookings: number;
  status: 'scheduled' | 'cancelled';
  booked: number;
  available: number;
};

export const listAvailableSlots = createServerFn({ method: 'GET' }).handler(async () => {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');

  const { data: slots, error } = await supabaseAdmin
    .from('trip_slots')
    .select('id, starts_at, ends_at, capacity, min_bookings, status')
    .gte('starts_at', new Date().toISOString())
    .order('starts_at', { ascending: true });

  if (error) throw new Error(error.message);

  const ids = (slots ?? []).map((s) => s.id);
  const counts = new Map<string, number>();
  if (ids.length) {
    const { data: bookings } = await supabaseAdmin
      .from('bookings')
      .select('slot_id, total_persons, payment_status')
      .in('slot_id', ids)
      .in('payment_status', ['paid', 'pending']);
    for (const b of bookings ?? []) {
      counts.set(b.slot_id, (counts.get(b.slot_id) ?? 0) + (b.total_persons ?? 0));
    }
  }

  return (slots ?? []).map((s): AvailableSlot => {
    const booked = counts.get(s.id) ?? 0;
    return {
      id: s.id,
      starts_at: s.starts_at,
      ends_at: s.ends_at,
      capacity: s.capacity,
      min_bookings: s.min_bookings,
      status: s.status as 'scheduled' | 'cancelled',
      booked,
      available: Math.max(0, s.capacity - booked),
    };
  });
});

export const getSlot = createServerFn({ method: 'GET' })
  .inputValidator((data: { slotId: string }) => z.object({ slotId: z.string().uuid() }).parse(data))
  .handler(async ({ data }): Promise<AvailableSlot | null> => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: slot } = await supabaseAdmin
      .from('trip_slots')
      .select('id, starts_at, ends_at, capacity, min_bookings, status')
      .eq('id', data.slotId)
      .maybeSingle();
    if (!slot) return null;
    const { data: bookings } = await supabaseAdmin
      .from('bookings')
      .select('total_persons')
      .eq('slot_id', slot.id)
      .in('payment_status', ['paid', 'pending']);
    const booked = (bookings ?? []).reduce((s, b) => s + (b.total_persons ?? 0), 0);
    return {
      id: slot.id,
      starts_at: slot.starts_at,
      ends_at: slot.ends_at,
      capacity: slot.capacity,
      min_bookings: slot.min_bookings,
      status: slot.status as 'scheduled' | 'cancelled',
      booked,
      available: Math.max(0, slot.capacity - booked),
    };
  });

const checkoutSchema = z.object({
  slotId: z.string().uuid(),
  customerName: z.string().trim().min(1).max(120),
  customerEmail: z.string().trim().email().max(200),
  customerPhone: z.string().trim().min(5).max(40),
  adults: z.number().int().min(0).max(36),
  children: z.number().int().min(0).max(36),
  babies: z.number().int().min(0).max(36),
  returnUrl: z.string().url(),
  environment: z.enum(['sandbox', 'live']),
});

export const createBookingCheckout = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => checkoutSchema.parse(data))
  .handler(async ({ data }): Promise<{ clientSecret: string } | { error: string }> => {
    try {
      const totalPersons = data.adults + data.children + data.babies;
      if (totalPersons < 1) return { error: 'Kies minimaal 1 persoon.' };
      if (totalPersons > SLOT_CAPACITY) return { error: 'Te veel personen voor één boeking.' };
      if (data.adults + data.children < 1)
        return { error: 'Een baby moet samen reizen met een kind of volwassene.' };

      const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
      const { createStripeClient, getStripeErrorMessage } = await import('./stripe.server');

      const { data: slot, error: slotErr } = await supabaseAdmin
        .from('trip_slots')
        .select('id, starts_at, ends_at, capacity, status')
        .eq('id', data.slotId)
        .single();
      if (slotErr || !slot) return { error: 'Tocht niet gevonden.' };
      if (slot.status !== 'scheduled') return { error: 'Deze tocht is niet meer beschikbaar.' };

      const { data: existing } = await supabaseAdmin
        .from('bookings')
        .select('total_persons')
        .eq('slot_id', slot.id)
        .in('payment_status', ['paid', 'pending']);
      const taken = (existing ?? []).reduce((s, b) => s + (b.total_persons ?? 0), 0);
      if (taken + totalPersons > slot.capacity) {
        return { error: `Helaas, er zijn nog maar ${slot.capacity - taken} plekken vrij.` };
      }

      const amountCents = data.adults * PRICE_ADULT_CENTS + data.children * PRICE_CHILD_CENTS;
      if (amountCents < 50) return { error: 'Selecteer minimaal één betalend ticket.' };

      const { data: booking, error: bookErr } = await supabaseAdmin
        .from('bookings')
        .insert({
          slot_id: slot.id,
          customer_name: data.customerName,
          customer_email: data.customerEmail,
          customer_phone: data.customerPhone,
          adults: data.adults,
          children: data.children,
          babies: data.babies,
          amount_cents: amountCents,
          currency: 'EUR',
          payment_status: 'pending',
        })
        .select('id')
        .single();
      if (bookErr || !booking) return { error: bookErr?.message ?? 'Kon boeking niet aanmaken.' };

      const stripe = createStripeClient(data.environment as StripeEnv);

      const lineItems: Array<{
        price_data: {
          currency: string;
          product_data: { name: string };
          unit_amount: number;
        };
        quantity: number;
      }> = [];
      if (data.adults > 0) {
        lineItems.push({
          price_data: {
            currency: 'eur',
            product_data: { name: 'Dagtocht volwassen' },
            unit_amount: PRICE_ADULT_CENTS,
          },
          quantity: data.adults,
        });
      }
      if (data.children > 0) {
        lineItems.push({
          price_data: {
            currency: 'eur',
            product_data: { name: 'Dagtocht kind (4–14 jaar)' },
            unit_amount: PRICE_CHILD_CENTS,
          },
          quantity: data.children,
        });
      }

      const startsAt = new Date(slot.starts_at);
      const dateLabel = startsAt.toLocaleString('nl-NL', {
        timeZone: 'Europe/Berlin',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
      });

      try {
        const session = await stripe.checkout.sessions.create({
          line_items: lineItems,
          mode: 'payment',
          ui_mode: 'embedded_page',
          return_url: data.returnUrl,
          customer_email: data.customerEmail,
          payment_intent_data: {
            description: `Marie Galante dagtocht — ${dateLabel}`,
          },
          metadata: {
            booking_id: booking.id,
            slot_id: slot.id,
          },
        });

        await supabaseAdmin
          .from('bookings')
          .update({ stripe_session_id: session.id })
          .eq('id', booking.id);

        return { clientSecret: session.client_secret ?? '' };
      } catch (stripeErr) {
        await supabaseAdmin
          .from('bookings')
          .update({ payment_status: 'failed' })
          .eq('id', booking.id);
        return { error: getStripeErrorMessage(stripeErr) };
      }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Onbekende fout' };
    }
  });