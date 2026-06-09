import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";

export const Route = createFileRoute("/dagtochten/bedankt")({
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  component: ThankYouPage,
  head: () => ({
    meta: [{ title: "Bedankt voor je boeking · Marie Galante" }],
  }),
});

function ThankYouPage() {
  const { session_id } = Route.useSearch();
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <div className="eyebrow">Bedankt!</div>
        <h1 className="mt-4 font-display text-4xl text-primary md:text-5xl">Je boeking is bevestigd</h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/80">
          We hebben je betaling ontvangen. Je krijgt een bevestiging per e-mail. Bewaar de mail goed —
          daar staat alle praktische info voor je tocht in.
        </p>
        {session_id && (
          <p className="mt-4 text-xs text-foreground/50">Referentie: {session_id}</p>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/dagtochten"
            className="inline-block border border-accent bg-accent px-6 py-3 text-xs uppercase tracking-[0.25em] text-accent-foreground hover:bg-transparent hover:text-accent"
          >
            Nog een tocht boeken
          </Link>
          <Link
            to="/"
            className="inline-block border border-foreground/30 px-6 py-3 text-xs uppercase tracking-[0.25em] text-foreground hover:bg-foreground/5"
          >
            ← naar home
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}