import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import hero from "@/assets/photos/marie-galante-zeilend.jpg";
import g1 from "@/assets/photos/g1.jpeg";
import g2 from "@/assets/photos/g2.jpg";
import g3 from "@/assets/photos/g3.jpg";
import g4 from "@/assets/photos/g4.avif";
import g5 from "@/assets/photos/g5.jpg";
import g6 from "@/assets/photos/g6.jpeg";
import interior1 from "@/assets/photos/interior-1.jpg";
import interior2 from "@/assets/photos/interior-2.jpg";
import interior3 from "@/assets/photos/interior-3.jpg";

export const Route = createFileRoute("/meevaren-oostzee")({
  component: MeevarenPage,
  head: () => ({
    meta: [
      { title: "Meevaren op de Oostzee · Marie Galante" },
      {
        name: "description",
        content:
          "Een week zeilen over de Oostzee aan boord van de Marie Galante. Ontdek de indeling van het schip, het vaargebied en een sfeerimpressie van havens en zeilen.",
      },
      { property: "og:title", content: "Meevaren op de Oostzee · Marie Galante" },
      {
        property: "og:description",
        content:
          "Stap aan boord voor een zeilreis over de Oostzee — havensteden, ruwe zee en het ritme van een historische logger.",
      },
      { property: "og:image", content: "https://i0.wp.com/marie-galante.nl/wp-content/uploads/2025/09/marie-galante-rotterdam-pic-7-1024x768.jpeg" },
    ],
  }),
});

const indeling = [
  { label: "Hutten", value: "5 historische hutten · 10 kooien" },
  { label: "Salon", value: "Ruime kombuis & eetzaal voor de hele bemanning" },
  { label: "Dek", value: "Open dek met stuurhut, kuip en zonneplek voor" },
  { label: "Sanitair", value: "Twee toiletten en een warme douche aan boord" },
  { label: "Lengte", value: "27 meter over alles · 6,5 meter breed" },
  { label: "Tuig", value: "Twee masten, gaffeltuig — gebouwd in 1915" },
];

const collage = [
  { src: g1, alt: "Zeilen op open water" },
  { src: g2, alt: "Haven bij zonsondergang" },
  { src: g3, alt: "Aan dek tijdens de overtocht" },
  { src: g4, alt: "Aanleggen in een Oostzeehaven" },
  { src: g5, alt: "Vol in de zeilen" },
  { src: g6, alt: "Sfeer aan boord" },
];

function MeevarenPage() {
  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
          <div className="eyebrow text-background/70">Vanaf 2026</div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-background md:text-7xl">
            Een week op de Oostzee
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <p className="font-display text-2xl leading-relaxed text-foreground/85 md:text-3xl">
          Het ritme van de wind, de geur van teer en zout, de horizon die elke dag verschuift. Stap aan boord van Marie Galante voor een week zeilen langs de kust van de Oostzee — van Deense fjorden tot Zweedse scherenkusten en stille Estse havens.
        </p>
      </section>

      {/* Indeling van het schip */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="eyebrow">Aan boord</div>
            <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">Indeling van het schip</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Marie Galante is geen luxejacht — het is een werkschip met karakter. Houten betimmering, koperen lampen en kooien waarin je het water tegen de romp hoort.
            </p>
          </div>
          <div className="md:col-span-7">
            <dl className="divide-y divide-foreground/15 border-y border-foreground/15">
              {indeling.map((row) => (
                <div key={row.label} className="grid grid-cols-3 gap-6 py-5">
                  <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">{row.label}</dt>
                  <dd className="col-span-2 text-foreground/85">{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 grid grid-cols-3 gap-3">
              <img src={interior1} alt="Salon" className="aspect-square w-full object-cover" />
              <img src={interior2} alt="Hut aan boord" className="aspect-square w-full object-cover" />
              <img src={interior3} alt="Kombuis" className="aspect-square w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Vaargebied / kaart */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid items-center gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="eyebrow">Het vaargebied</div>
              <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">Van Kiel tot Tallinn</h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground/80">
                We varen door de Deense Sont, langs de Zweedse zuidkust en de scherenkust bij Stockholm, met uitstapjes naar Gotland, de Ålandeilanden en de Baltische staten. Elke reis is anders — de wind bepaalt de koers.
              </p>
              <ul className="mt-8 space-y-2 text-sm uppercase tracking-[0.2em] text-foreground/70">
                <li>· Kiel — Kopenhagen — Stockholm</li>
                <li>· Gotland — Visby — Ålandeilanden</li>
                <li>· Helsinki — Tallinn — Riga</li>
              </ul>
            </div>
            <div className="md:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-foreground/15 bg-background">
                <iframe
                  title="Vaargebied Oostzee"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=8.0%2C53.5%2C30.5%2C66.0&layer=mapnik"
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-foreground/55">
                Indicatief vaargebied — exacte route volgt wind en weer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sfeerimpressie collage */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="max-w-2xl">
          <div className="eyebrow">Een week aan boord</div>
          <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">Havens, zeilen en stilte</h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            Vroege ochtenden met koffie op dek, lange dagen onder zeil en avonden in onbekende havens waar het bier lokaal is en de zon pas laat ondergaat.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <img src={collage[0].src} alt={collage[0].alt} className="col-span-2 row-span-2 aspect-square w-full object-cover" />
          <img src={collage[1].src} alt={collage[1].alt} className="aspect-square w-full object-cover" />
          <img src={collage[2].src} alt={collage[2].alt} className="aspect-square w-full object-cover" />
          <img src={collage[3].src} alt={collage[3].alt} className="aspect-[4/5] w-full object-cover md:aspect-square" />
          <img src={collage[4].src} alt={collage[4].alt} className="aspect-[4/5] w-full object-cover md:aspect-square" />
          <img src={collage[5].src} alt={collage[5].alt} className="col-span-2 aspect-[2/1] w-full object-cover md:col-span-2 md:aspect-square" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-24 text-primary-foreground">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <div className="eyebrow text-primary-foreground/60">Vanaf 2026</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Vaar mee de eerste reis</h2>
          <p className="mt-6 text-primary-foreground/80">
            We stellen de eerste reizen samen — laat weten dat je interesse hebt en we houden je op de hoogte van data, route en prijzen.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="mailto:info@marie-galante.nl" className="inline-block border border-accent bg-accent px-8 py-3 text-xs uppercase tracking-[0.25em] text-accent-foreground hover:bg-transparent hover:text-accent">
              Zet me op de wachtlijst
            </a>
            <Link to="/boek-jouw-avontuur" className="inline-block border border-primary-foreground/40 px-8 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground hover:border-accent hover:text-accent">
              Terug naar overzicht
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}