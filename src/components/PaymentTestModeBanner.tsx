const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;

export function PaymentTestModeBanner() {
  if (!clientToken) {
    return (
      <div className="w-full bg-red-100 border-b border-red-300 px-4 py-2 text-center text-sm text-red-800">
        Live betalingen zijn nog niet geconfigureerd. Voltooi de Stripe go-live in je Lovable-project om echte betalingen te accepteren.
      </div>
    );
  }
  if (clientToken.startsWith('pk_test_')) {
    return (
      <div className="w-full bg-orange-100 border-b border-orange-300 px-4 py-2 text-center text-sm text-orange-800">
        Alle betalingen in deze preview zijn test-betalingen. Gebruik kaartnummer 4242 4242 4242 4242.
      </div>
    );
  }
  return null;
}