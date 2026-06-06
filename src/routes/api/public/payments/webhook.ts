import { createFileRoute } from '@tanstack/react-router';
import { type StripeEnv, verifyWebhook } from '@/lib/stripe.server';

async function markBookingPaid(
  bookingId: string,
  paymentIntentId: string | null,
  sessionId: string | null,
) {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const update: Record<string, unknown> = { payment_status: 'paid' };
  if (paymentIntentId) update.stripe_payment_intent_id = paymentIntentId;
  if (sessionId) {
    await supabaseAdmin
      .from('bookings')
      .update(update)
      .eq('stripe_session_id', sessionId);
  } else {
    await supabaseAdmin.from('bookings').update(update).eq('id', bookingId);
  }
}

async function markBookingFailed(sessionId: string | null, bookingId: string | null) {
  if (!sessionId && !bookingId) return;
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const q = supabaseAdmin.from('bookings').update({ payment_status: 'failed' });
  if (sessionId) await q.eq('stripe_session_id', sessionId);
  else if (bookingId) await q.eq('id', bookingId);
}

async function handleWebhook(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);
  const obj = event.data?.object ?? {};
  const bookingId: string | null = obj?.metadata?.booking_id ?? null;
  const sessionId: string | null = obj?.id?.startsWith?.('cs_') ? obj.id : obj?.checkout_session ?? null;
  const paymentIntent: string | null =
    typeof obj?.payment_intent === 'string' ? obj.payment_intent : obj?.payment_intent?.id ?? null;

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded':
    case 'transaction.completed':
      if (bookingId || sessionId) {
        await markBookingPaid(bookingId ?? '', paymentIntent, sessionId);
      }
      break;
    case 'checkout.session.async_payment_failed':
    case 'transaction.payment_failed':
      await markBookingFailed(sessionId, bookingId);
      break;
    default:
      console.log('[payments-webhook] unhandled event:', event.type);
  }
}

export const Route = createFileRoute('/api/public/payments/webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get('env');
        if (rawEnv !== 'sandbox' && rawEnv !== 'live') {
          return Response.json({ received: true, ignored: 'invalid env' });
        }
        try {
          await handleWebhook(request, rawEnv as StripeEnv);
          return Response.json({ received: true });
        } catch (e) {
          console.error('Webhook error:', e);
          return new Response('Webhook error', { status: 400 });
        }
      },
    },
  },
});