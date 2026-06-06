import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';

export type AdminBooking = {
  id: string;
  slot_id: string;
  starts_at: string;
  ends_at: string;
  slot_status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  adults: number;
  children: number;
  babies: number;
  total_persons: number;
  amount_cents: number;
  currency: string;
  payment_status: string;
  created_at: string;
};

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error('Forbidden: admin only');
}

export const listAdminBookings = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminBooking[]> => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select(
        'id, slot_id, customer_name, customer_email, customer_phone, adults, children, babies, total_persons, amount_cents, currency, payment_status, created_at, trip_slots!inner(starts_at, ends_at, status)'
      )
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((b: any) => ({
      id: b.id,
      slot_id: b.slot_id,
      starts_at: b.trip_slots.starts_at,
      ends_at: b.trip_slots.ends_at,
      slot_status: b.trip_slots.status,
      customer_name: b.customer_name,
      customer_email: b.customer_email,
      customer_phone: b.customer_phone,
      adults: b.adults,
      children: b.children,
      babies: b.babies,
      total_persons: b.total_persons,
      amount_cents: b.amount_cents,
      currency: b.currency,
      payment_status: b.payment_status,
      created_at: b.created_at,
    }));
  });

export const checkIsAdmin = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ isAdmin: boolean }> => {
    const { data } = await context.supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', context.userId)
      .eq('role', 'admin')
      .maybeSingle();
    return { isAdmin: !!data };
  });