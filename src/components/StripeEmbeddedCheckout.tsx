import { useMemo } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { getStripe, getStripeEnvironment } from '@/lib/stripe';
import { createBookingCheckout } from '@/lib/bookings.functions';

interface Props {
  slotId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  adults: number;
  children: number;
  babies: number;
  returnUrl: string;
  onError?: (msg: string) => void;
}

export function StripeEmbeddedCheckoutForBooking(props: Props) {
  const options = useMemo(
    () => ({
      fetchClientSecret: async () => {
        const result = await createBookingCheckout({
          data: {
            slotId: props.slotId,
            customerName: props.customerName,
            customerEmail: props.customerEmail,
            customerPhone: props.customerPhone,
            adults: props.adults,
            children: props.children,
            babies: props.babies,
            returnUrl: props.returnUrl,
            environment: getStripeEnvironment(),
          },
        });
        if ('error' in result) {
          props.onError?.(result.error);
          throw new Error(result.error);
        }
        if (!result.clientSecret) {
          const msg = 'Stripe gaf geen client secret terug.';
          props.onError?.(msg);
          throw new Error(msg);
        }
        return result.clientSecret;
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div id="checkout" className="min-h-[600px]">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}