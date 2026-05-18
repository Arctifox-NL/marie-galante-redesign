import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";

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

type Post = {
  date: string;
  coords: string;
  title: string;
  excerpt: string;
  img?: string;
  href: string;
};

const posts: Post[] = [
  {
    date: "31 okt 2025",
    coords: "53° 11′ N · 005° 25′ E",
    title: "Nieuwe tuig en hoog water",
    excerpt: "Oktober was er eentje. Mijn werk op de Waddenzee zat er bijna op, Lex voer met de Gulden Leeuw naar La Coruña en de nieuwe tuigtekeningen waren eindelijk af.",
    img: "https://i0.wp.com/marie-galante.nl/wp-content/uploads/2026/02/PXL_20251005_125952142.jpg?resize=1200%2C900&ssl=1",
    href: "https://marie-galante.nl/2025/10/31/nieuwe-tuig-en-hoog-water/",
  },
  {
    date: "30 sep 2025",
    coords: "53° 11′ N · 005° 25′ E",
    title: "Een kleine september samenvatting",
    excerpt: "Dit jaar wil ik zo veel mogelijk ervaring opdoen bij verschillende schepen. Een grote platbodem op de Waddenzee kan daar natuurlijk niet aan ontbreken.",
    img: "https://i0.wp.com/marie-galante.nl/wp-content/uploads/2026/02/PXL_20250912_171209310.jpg?resize=1200%2C900&ssl=1",
    href: "https://marie-galante.nl/2025/09/30/een-kleine-september-samenvatting/",
  },
  {
    date: "31 aug 2025",
    coords: "51.90.68N · 004.47.98E",
    title: "Marietta is hier!",
    excerpt: "Deze maand een extra hulp aan boord: Marietta! We beginnen nieuwe projecten en ronden oude af — een nieuwe linnenkast, een nieuwe douchedeur, schilderwerk.",
    img: "https://i0.wp.com/marie-galante.nl/wp-content/uploads/2025/09/PXL_20250816_182857183-1.jpg?resize=1200%2C900&ssl=1",
    href: "https://marie-galante.nl/2025/08/31/marietta-is-hier/",
  },
  {
    date: "31 jul 2025",
    coords: "51.90.23N · 004.47.93E",
    title: "Schilderen in juli",
    excerpt: "Het is tijd voor een nieuw kleurtje. Sinds mei zijn we bezig met roestbikken, schuren en schilderen. Een licht groene wit met aqua detail — ze krijgt steeds meer vorm.",
    img: "https://i0.wp.com/marie-galante.nl/wp-content/uploads/2025/09/PXL_20250725_141601286-1.jpg?resize=1200%2C900&ssl=1",
    href: "https://marie-galante.nl/2025/07/31/schilderen-in-juli/",
  },
  {
    date: "15 jun 2025",
    coords: "51.90.23N · 004.47.93E",
    title: "Het sanitair",
    excerpt: "Tijd om het gastensanitair onder handen te nemen. Twee toiletten, twee douches — schuren, plamuren, schilderen en inrichten. Spiegels gemonteerd met oude lijnen uit het tuigage.",
    img: "https://i0.wp.com/marie-galante.nl/wp-content/uploads/2025/09/PXL_20250612_185231598-1.jpg?resize=1200%2C900&ssl=1",
    href: "https://marie-galante.nl/2025/06/15/het-sanitair/",
  },
  {
    date: "31 mei 2025",
    coords: "51.39N · 003.55E",
    title: "Een zeeuws uitstapje",
    excerpt: "Even wat anders: bij Wiebe aan boord van De Vrijbuiter. Met evenementen zoals Muziek in de Zeilen laat het schip mensen kennismaken met cultuur en zeilkunst.",
    img: "https://i0.wp.com/marie-galante.nl/wp-content/uploads/2025/09/PXL_20250519_082334413.jpg?resize=1200%2C900&ssl=1",
    href: "https://marie-galante.nl/2025/05/31/een-zeeuwsuitstapje/",
  },
  {
    date: "25 apr 2025",
    coords: "51.54.263N · 004.28.461E",
    title: "Foto update — 25 april",
    excerpt: "Bij thuiskomst geen tijd te verliezen: verlichting in het ruim aangepakt, nieuwe foto's voor de Airbnb-advertentie en het grote opruimwerk begonnen.",
    img: "https://i0.wp.com/marie-galante.nl/wp-content/uploads/2025/09/PXL_20250425_173517509.jpg?resize=1200%2C900&ssl=1",
    href: "https://marie-galante.nl/2025/04/25/foto-update-25-april-2025/",
  },
  {
    date: "19 apr 2025",
    coords: "52.28.59N · 004.39.25E",
    title: "Klassieke Schepen Fonds — Race of the Classics",
    excerpt: "Ieder jaar reikt de organisatie van Race of the Classics een geldprijs uit ter behoud van de vloot. Dit jaar is die prijs aan ons uitgereikt.",
    href: "https://marie-galante.nl/2025/04/19/klassieke-schepen-fonds-race-of-the-classics-2025/",
  },
  {
    date: "18 apr 2025",
    coords: "53.24.23N · 006.12.13E",
    title: "De aankoop",
    excerpt: "Race of the Classics, dag van het gala — we liggen op Lauwersoog. De notaris belt: morgen is de kadasterinschrijving compleet en dan is het schip echt van jullie.",
    img: "https://i0.wp.com/marie-galante.nl/wp-content/uploads/2025/09/ROTC25-3.jpg?resize=1200%2C900&ssl=1",
    href: "https://marie-galante.nl/2025/04/18/de-aankoop-18-april-2025/",
  },
  {
    date: "31 jan 2025",
    coords: "Rotterdam → Franeker",
    title: "De verkoopkeur",
    excerpt: "Na voorbereidingen vertrekt Marie Galante van haar vaste plek in Rotterdam naar de werf in Franeker. Koud en guur buiten, gemoedelijk in de stuurhut.",
    img: "https://i0.wp.com/marie-galante.nl/wp-content/uploads/2025/09/PXL_20250130_1038026962.jpg?resize=1200%2C900&ssl=1",
    href: "https://marie-galante.nl/2025/01/31/verkoopkeur/",
  },
];

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
        <a href={feat.href} target="_blank" rel="noreferrer" className="group grid gap-10 md:grid-cols-12 md:gap-16">
          {feat.img && (
            <div className="overflow-hidden md:col-span-7">
              <img src={feat.img} alt={feat.title} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
        </a>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32 md:px-10">
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <a key={p.title} href={p.href} target="_blank" rel="noreferrer" className="group block">
              {p.img ? (
                <div className="overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-secondary">
                  <span className="font-display text-3xl italic text-primary/50">Marie Galante</span>
                </div>
              )}
              <div className="mt-5 eyebrow">{p.date} · {p.coords}</div>
              <h3 className="mt-2 font-display text-2xl text-primary group-hover:text-accent">{p.title}</h3>
              <p className="mt-3 text-sm text-foreground/75">{p.excerpt}</p>
            </a>
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