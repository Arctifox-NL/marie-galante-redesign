import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import zeilendImg from "@/assets/photos/marie-galante-zeilend.jpg";
import dagtochtenImg from "@/assets/photos/g3.jpg";
import veerhaven1 from "@/assets/photos/veerhaven-1.jpg";
import veerhaven2 from "@/assets/photos/veerhaven-2.jpg";
import veerhaven4 from "@/assets/photos/veerhaven-4.jpg";
import veerhaven6 from "@/assets/photos/veerhaven-6.jpg";
import feestjeImg from "@/assets/photos/feestje-aan-boord.jpg";

export const Route = createFileRoute("/boek-jouw-avontuur")({
  component: BoekPage,
  head: () => ({
    meta: [
      { title: "Boek je avontuur · Marie Galante" },
      { name: "description", content: "Overnacht aan boord van de Marie Galante in de Veerhaven Rotterdam, organiseer een feestje of vaar binnenkort mee op de Oostzee." },
    ],
  }),
});

const HERO = "https://i0.wp.com/marie-galante.nl/wp-content/uploads/2025/09/marie-galante-rotterdam-pic-7-1024x768.jpeg";

const options = [
  {
    eyebrow: "Vanaf 2026",
    title: "Meevaren op de Oostzee",
    body: "Het tuig staat, de keuring is rond — het avontuur begint. Stap aan boord voor een zeilreis over de Oostzee, ontdek verborgen havensteden en vaar mee op een historisch schip met een verhaal.",
    img: zeilendImg,
    cta: "Meer info",
    ctaHref: "/meevaren-oostzee",
    internal: true,
  },
  {
    eyebrow: "Tickets",
    title: "Dagtochten",
    body: "Vaar een dag mee vanuit een van de badplaatsen aan de Oostzee. Hijs de zeilen, voel de wind en ervaar hoe een historische logger door het water glijdt — geen ervaring nodig.",
    img: dagtochtenImg,
    cta: "Bekijk data & tickets",
    ctaHref: "/dagtochten",
    internal: true,
  },
  {
    eyebrow: "Bed & Breakfast",
    title: "Overnachten in de Veerhaven",
    body: "In de wintermaanden ligt Marie Galante aan de kade in Rotterdam. Slaap in een van de historische hutten aan dek, wakker worden met uitzicht op de Erasmusbrug en geniet van koffie in de salon — een bijzondere overnachting midden in de stad.",
    img: "https://i0.wp.com/marie-galante.nl/wp-content/uploads/2025/09/PXL_20250423_115326725-1024x576.jpg",
    cta: "Reserveer via Airbnb",
    ctaHref: "https://www.airbnb.nl/rooms/1384088957429815841?adults=9&check_in=2026-06-01&check_out=2026-06-03&guests=9&search_mode=regular_search&children=0&infants=0&pets=0&source_impression_id=p3_1779624526_P3RrNrx8c-HVOh24&previous_page_section_name=1000&federated_search_id=071b7654-629a-479f-b10f-a542e57acfc3",
    collage: [veerhaven1, veerhaven2, veerhaven4, veerhaven6],
  },
  {
    eyebrow: "Privé & evenementen",
    title: "Een feestje aan boord",
    body: "Verjaardag, bedrijfsuitje of bruiloft — Marie Galante biedt een unieke locatie aan de kade. Bar, dek en salon zijn beschikbaar voor groepen tot 36 personen.",
    img: feestjeImg,
    cta: "Vraag de mogelijkheden aan",
    ctaHref: "mailto:info@marie-galante.nl",
  },
];

function BoekPage() {
  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
        <div className="eyebrow text-background/70">Klaar voor het echte werk?</div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-background md:text-7xl">Ga mee op avontuur</h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <p className="font-display text-2xl leading-relaxed text-foreground/85 md:text-3xl">
          De wind in de zeilen, de horizon voor je — Marie Galante wacht op jou. Kies voor een zeilreis over de Oostzee, een dagtocht vanuit een badplaats, overnacht in de winter aan boord in Rotterdam, of vier een feestje op een historisch schip.
        </p>
      </section>

      <section className="mx-auto max-w-7xl space-y-28 px-6 pb-32 md:px-10 md:space-y-40">
        {options.map((o, i) => (
          <article key={o.title} className="grid items-center gap-12 md:grid-cols-12 md:gap-20">
            <div className={`md:col-span-6 ${i % 2 ? "md:order-2" : ""}`}>
              {o.collage ? (
                <div className="grid grid-cols-2 gap-3">
                  {o.collage.map((src, idx) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${o.title} ${idx + 1}`}
                      loading="lazy"
                      className="w-full aspect-square object-cover"
                    />
                  ))}
                </div>
              ) : (
                <img src={o.img} alt={o.title} className="aspect-[4/3] w-full object-cover" />
              )}
            </div>
            <div className={`md:col-span-6 ${i % 2 ? "md:order-1" : ""}`}>
              <div className="eyebrow">{o.eyebrow}</div>
              <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">
                {o.internal ? (
                  <Link to={o.ctaHref} className="transition-colors hover:text-accent">
                    {o.title}
                  </Link>
                ) : (
                  o.title
                )}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground/80">{o.body}</p>
              {o.internal ? (
                <Link to={o.ctaHref} className="mt-8 inline-block border-b border-accent pb-1 text-xs uppercase tracking-[0.25em] text-primary hover:text-accent">
                  {o.cta} →
                </Link>
              ) : (
                <a href={o.ctaHref} target={o.ctaHref.startsWith('http') ? '_blank' : undefined} rel={o.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined} className="mt-8 inline-block border-b border-accent pb-1 text-xs uppercase tracking-[0.25em] text-primary hover:text-accent">
                  {o.cta} →
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="bg-primary py-24 text-primary-foreground">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <div className="eyebrow text-primary-foreground/60">Vragen?</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Stuur ons een bericht</h2>
          <p className="mt-6 text-primary-foreground/80">
            We denken graag mee over de mogelijkheden — een avond aan de kade, een week op de Oostzee of iets daar tussenin.
          </p>
          <a href="mailto:info@marie-galante.nl" className="mt-10 inline-block border border-accent bg-accent px-8 py-3 text-xs uppercase tracking-[0.25em] text-accent-foreground hover:bg-transparent hover:text-accent">
            info@marie-galante.nl
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}