import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import hero from "@/assets/photos/marie-galante-zeilend.jpg";

export const Route = createFileRoute("/dagtochten")({
  component: DagtochtenPage,
  head: () => ({
    meta: [
      { title: "Dagtochten · Tickets · Marie Galante" },
      {
        name: "description",
        content:
          "Boek een ticket voor een dagtocht aan boord van de Marie Galante — een historische zeillogger uit 1915, vertrekkend vanuit een van de badplaatsen aan de Oostzee.",
      },
      { property: "og:title", content: "Dagtochten · Marie Galante" },
      {
        property: "og:description",
        content: "Vaar een dag mee aan boord van de Marie Galante. Boek je ticket online.",
      },
    ],
  }),
});

function DagtochtenPage() {
  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
          <div className="eyebrow text-background/70">Tickets</div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-background md:text-7xl">
            Vaar een dag mee
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <p className="font-display text-2xl leading-relaxed text-foreground/85 md:text-3xl">
          Stap aan boord van de Marie Galante voor een tocht vanuit een van de badplaatsen aan de Oostzee. Hijs de zeilen, voel de wind en ervaar hoe een historische logger door het water glijdt.
        </p>
      </section>

      {/* Praktische info */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="eyebrow">Praktisch</div>
            <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">Wat je kunt verwachten</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Een dag op het water onder leiding van Lex en Lotte. Geen ervaring nodig — meehelpen mag, toekijken ook.
            </p>
          </div>
          <div className="md:col-span-7">
            <dl className="divide-y divide-foreground/15 border-y border-foreground/15">
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">Vertrek</dt>
                <dd className="col-span-2 text-foreground/85">Badplaatsen aan de Oostzee</dd>
              </div>
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">Duur</dt>
                <dd className="col-span-2 text-foreground/85">Ongeveer een hele dag</dd>
              </div>
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">Inbegrepen</dt>
                <dd className="col-span-2 text-foreground/85">Koffie, thee en een lunch aan boord</dd>
              </div>
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">Ervaring</dt>
                <dd className="col-span-2 text-foreground/85">Niet nodig — iedereen welkom</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Ticket widget */}
      <section id="tickets" className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="eyebrow">Boek je ticket</div>
            <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">Kies je datum</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Onze tickets worden verkocht via Weeztix. Zodra de eerste data bekend zijn verschijnt de ticketshop hieronder.
            </p>
          </div>

          {/* Weeztix embed placeholder — vervang dit blok door de iframe / script die Weeztix aanlevert */}
          <div className="mt-12 flex min-h-[480px] items-center justify-center border border-dashed border-foreground/25 bg-background p-10 text-center">
            <div>
              <div className="eyebrow text-foreground/55">Ticketshop</div>
              <p className="mt-4 max-w-md text-foreground/70">
                Hier komt de Weeztix-ticketshop. Stuur de embed-code zodra je shop klaar staat, dan plaatsen we hem hier.
              </p>
              <a
                href="mailto:info@marie-galante.nl"
                className="mt-8 inline-block border border-accent bg-accent px-8 py-3 text-xs uppercase tracking-[0.25em] text-accent-foreground hover:bg-transparent hover:text-accent"
              >
                Vraag naar de eerste data
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}