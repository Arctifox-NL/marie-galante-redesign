import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import { posts } from "@/data/logbook";

export const Route = createFileRoute("/logboek")({
  component: LogbookPage,
  head: () => ({
    meta: [
      { title: "Logboek · Marie Galante" },
      { name: "description", content: "Voortgang van de verbouwing, avonturen aan boord en alles wat we tegenkomen op weg naar de Oostzee." },
    ],
  }),
});

const HERO = "https://i0.wp.com/marie-galante.nl/wp-content/uploads/2026/02/PXL_20251005_125952142.jpg?resize=1200%2C900&ssl=1";

function LogbookPage() {
  const [feat, ...rest] = posts;
  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
          <div className="eyebrow text-background/70">Sinds april 2025</div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-background md:text-7xl">Logboek</h1>
          <p className="mt-4 max-w-xl text-background/85">
            Lees over de voortgang van de verbouwing, de avonturen die we beleven en wat we onderweg tegenkomen.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <Link to="/logboek/$slug" params={{ slug: feat.slug }} className="group grid gap-10 md:grid-cols-12 md:gap-16">
          {feat.cover && (
            <div className="overflow-hidden md:col-span-7">
              <img src={feat.cover} alt={feat.title} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          )}
          <div className="md:col-span-5 md:pt-8">
            <div className="eyebrow">{feat.date} · {feat.coords}</div>
            <h2 className="mt-4 font-display text-4xl leading-tight text-primary md:text-5xl">{feat.title}</h2>
            <p className="mt-6 text-lg text-foreground/80">{feat.excerpt}</p>
            <span className="mt-6 inline-block border-b border-accent pb-1 text-xs uppercase tracking-[0.25em] text-primary group-hover:text-accent">
              Lees verder →
            </span>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32 md:px-10">
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} to="/logboek/$slug" params={{ slug: p.slug }} className="group block">
              {p.cover ? (
                <div className="overflow-hidden">
                  <img src={p.cover} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-secondary">
                  <span className="font-display text-3xl italic text-primary/50">Marie Galante</span>
                </div>
              )}
              <div className="mt-5 eyebrow">{p.date} · {p.coords}</div>
              <h3 className="mt-2 font-display text-2xl text-primary group-hover:text-accent">{p.title}</h3>
              <p className="mt-3 text-sm text-foreground/75">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary py-20 text-center text-primary-foreground">
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          <div className="eyebrow text-primary-foreground/60">Mis niets</div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl">Volg ons op Instagram voor dagelijkse updates</h2>
          <a href="https://www.instagram.com/mariegalante1915/" target="_blank" rel="noreferrer" className="mt-8 inline-block border border-accent bg-accent px-7 py-3 text-xs uppercase tracking-[0.25em] text-accent-foreground hover:bg-transparent hover:text-accent">
            @mariegalante1915
          </a>
          <div className="mt-6">
            <Link to="/" className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70 hover:text-accent">← terug naar home</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}