import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import heroImg from "@/assets/photos/hero.jpg";
import interior1 from "@/assets/photos/interior-1.jpg";
import interior2 from "@/assets/photos/interior-2.jpg";
import interior3 from "@/assets/photos/interior-3.jpg";
import interior4 from "@/assets/photos/interior-4.jpg";
import interior5 from "@/assets/photos/interior-5.jpg";
import interior6 from "@/assets/photos/interior-6.jpg";
import interior7 from "@/assets/photos/interior-7.jpg";
import portraitImg from "@/assets/photos/lex-lotte.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Marie Galante — Zeillogger uit 1915 · Rotterdam" },
      { name: "description", content: "Ontdek de wereld van het zeilen op de historische logger Marie Galante. Overnacht aan boord, vaar mee of vier een feestje aan de Veerhaven Rotterdam." },
    ],
  }),
});

const HERO = heroImg;
const PORTRAIT = portraitImg;
const GALLERY = [interior1, interior2, interior7, interior3, interior4, interior5, interior6];

function Index() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img src={HERO} alt="Marie Galante in de Veerhaven Rotterdam" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/10 to-primary/70" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 md:px-10 md:pb-32">
          <div className="eyebrow text-background/70">Sinds 1915 · Zeillogger</div>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-background md:text-7xl lg:text-8xl">
            Marie Galante
          </h1>
          <p className="mt-6 max-w-xl text-background/85 md:text-lg">
            Ontdek de wereld van het zeilen op deze historische logger. Gebouwd in 1915 als visserschip, in 1980 omgebouwd tot passagiersschip — en nu klaar voor een nieuw hoofdstuk.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/boek-jouw-avontuur" className="rounded-none border border-accent bg-accent px-7 py-3 text-xs uppercase tracking-[0.25em] text-accent-foreground transition-colors hover:bg-transparent hover:text-accent">
              Boek je avontuur
            </Link>
            <Link to="/terug-in-de-tijd" className="rounded-none border border-background/70 px-7 py-3 text-xs uppercase tracking-[0.25em] text-background transition-colors hover:bg-background hover:text-primary">
              Onze geschiedenis
            </Link>
          </div>
        </div>
      </section>

      {/* BASISINFO SCHIP */}
      <section className="mx-auto max-w-7xl px-6 pt-28 md:px-10 md:pt-40">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <div className="eyebrow">Het schip</div>
            <h2 className="mt-4 font-display text-4xl leading-tight text-primary md:text-5xl">
              Marie Galante (PFTM)
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Een historische zeillogger met karakter. Gebouwd in 1915 als visserschip, in 1980 omgebouwd tot passagiersschip — en nu klaar voor nieuwe avonturen.
            </p>
          </div>
          <div className="md:col-span-7">
            <dl className="divide-y divide-foreground/15 border-y border-foreground/15">
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">Naam</dt>
                <dd className="col-span-2 text-foreground/85">Marie Galante</dd>
              </div>
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">Bouwjaar</dt>
                <dd className="col-span-2 text-foreground/85">1915</dd>
              </div>
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">Type</dt>
                <dd className="col-span-2 text-foreground/85">Zeillogger — gaffeltuig, twee masten</dd>
              </div>
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">Afmetingen</dt>
                <dd className="col-span-2 text-foreground/85">27 meter lang · 6,5 meter breed</dd>
              </div>
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">Thuishaven</dt>
                <dd className="col-span-2 text-foreground/85">Rotterdam — Veerhaven</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* INTRO / ABOUT */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <img src={PORTRAIT} alt="Lex & Lotte" className="w-full object-cover shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]" />
          </div>
          <div className="md:col-span-7 md:pt-12">
            <div className="eyebrow">Dit zijn wij</div>
            <h2 className="mt-4 font-display text-4xl leading-tight text-primary md:text-5xl">
              <em className="font-light">Lex van der Linden</em> &amp; <em className="font-light">Lotte van Boesschoten</em>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-foreground/80">
              In april 2025 kochten we samen het zeilschip Marie Galante. Sinds 2015 ligt het schip in de Veerhaven in Rotterdam — en samen willen we haar terugbrengen naar de Oostzee, om daar gasten een actieve zeilvakantie te bieden.
            </p>
            <p className="mt-6 text-foreground/70">
              Volg het avontuur, kom een nachtje slapen aan boord, of duik mee in de bijzondere historie van dit schip.
            </p>
            <div className="mt-10 grid grid-cols-3 border-t border-border pt-8">
              <Stat k="1915" v="Gebouwd als logger" />
              <Stat k="1980" v="Verbouwd tot zeilschip" />
              <Stat k="2025" v="Nieuwe eigenaren" />
            </div>
          </div>
        </div>
      </section>

      {/* LIVE TRACKER PREVIEW */}
      <section className="bg-secondary py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="eyebrow">Live aan boord</div>
              <h2 className="mt-4 font-display text-4xl leading-tight text-primary md:text-5xl">
                Volg het schip live op de kaart
              </h2>
              <p className="mt-6 text-foreground/75">
                Benieuwd waar de Marie Galante nu vaart of voor anker ligt? Bekijk de live positie via MarineTraffic — realtime en overal te volgen.
              </p>
              <Link to="/tracker" className="mt-10 inline-block border border-primary bg-primary px-7 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary">
                Open de live tracker
              </Link>
            </div>
            <div className="md:col-span-7">
              <Link to="/tracker" className="group block aspect-[4/3] w-full overflow-hidden border border-border bg-muted shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]">
                <iframe
                  src="https://www.marinetraffic.com/en/ais/embed/zoom:7/centery:54.5/centerx:11/maptype:4/shownames:true/mmsi:244556000/shipid:0/fleet:/fleet_id:/vtypes:/showmenu:false/remember:false"
                  title="Live positie Marie Galante"
                  width="100%"
                  height="100%"
                  frameBorder={0}
                  scrolling="no"
                  className="pointer-events-none h-full w-full"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OVERNACHTEN GALLERY */}
      <section className="bg-primary py-28 text-primary-foreground md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow text-primary-foreground/60">Aan de kade in Rotterdam</div>
              <h2 className="mt-4 font-display text-4xl md:text-6xl">Overnachten aan boord</h2>
            </div>
            <Link to="/boek-jouw-avontuur" className="text-xs uppercase tracking-[0.25em] text-accent hover:underline">
              Bekijk de mogelijkheden →
            </Link>
          </div>
          <div className="mt-16 columns-1 gap-3 sm:columns-2 md:columns-3 md:gap-5">
            {GALLERY.map((src) => (
              <div key={src} className="mb-3 break-inside-avoid overflow-hidden md:mb-5">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-auto w-full transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM CTA */}
      <section className="mx-auto max-w-7xl px-6 py-28 text-center md:px-10 md:py-36">
        <div className="eyebrow">Volg het avontuur</div>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-tight text-primary md:text-6xl">
          Van de werf tot de Oostzee — elke week een nieuw verhaal.
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="https://www.instagram.com/mariegalante1915/" target="_blank" rel="noreferrer" className="border border-primary bg-primary px-7 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary">
            Volg ons op Instagram
          </a>
          <Link to="/logboek" className="border border-primary px-7 py-3 text-xs uppercase tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            Lees het logboek
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-primary md:text-4xl">{k}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{v}</div>
    </div>
  );
}
