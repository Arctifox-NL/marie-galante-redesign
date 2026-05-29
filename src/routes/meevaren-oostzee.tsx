import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import SiteLayout from "@/components/SiteLayout";
import hero from "@/assets/photos/marie-galante-zeilend.jpg";
import interior1 from "@/assets/photos/interior-1.jpg";
import interior2 from "@/assets/photos/interior-2.jpg";
import interior3 from "@/assets/photos/interior-3.jpg";
import sfeerZeekaart from "@/assets/photos/sfeer-zeekaart.jpg";
import sfeerSchleimunde from "@/assets/photos/sfeer-schleimunde.jpg";
import sfeerEckernforde from "@/assets/photos/sfeer-eckernforde.jpg";
import sfeerBagenkop from "@/assets/photos/sfeer-bagenkop.jpg";
import sfeerCliffs from "@/assets/photos/sfeer-cliffs.jpg";
import sfeerKust from "@/assets/photos/sfeer-kust.jpg";
import sfeerBloemenveld from "@/assets/photos/sfeer-bloemenveld.jpg";
import sfeerKoe from "@/assets/photos/sfeer-koe.jpg";
import sfeerSunsetCouple from "@/assets/photos/sfeer-sunset-couple.jpg";
import sfeerHavenSunset from "@/assets/photos/sfeer-haven-sunset.jpg";

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

const indelingKeys = ["hutten", "salon", "sanitair", "lengte", "tuig"] as const;
const faqKeys = [1, 2, 3, 4, 5, 6] as const;

// Afwisseling van portret & landschap, opbouw van dag naar avond
const gallery = [
  { src: sfeerSchleimunde, alt: "Groen-witte vuurtoren van Schleimünde" },
  { src: sfeerCliffs, alt: "Witte krijtrotsen aan de Deense kust" },
  { src: sfeerKoe, alt: "Nieuwsgierige Jersey-koe in een Deens weiland" },
  { src: sfeerBagenkop, alt: "Zeilboot vaart de haven van Bagenkop binnen" },
  { src: sfeerZeekaart, alt: "Zeekaart van de Kieler Bucht met passer en koersliniaal" },
  { src: sfeerKust, alt: "Stille rotskust aan de Oostzee" },
  { src: sfeerHavenSunset, alt: "Haven bij zonsondergang met silhouetten van masten" },
  { src: sfeerBloemenveld, alt: "Aan land tussen bloemen en korenvelden" },
  { src: sfeerEckernforde, alt: "Blauw-gele vuurtoren aan de kade van Eckernförde" },
  { src: sfeerSunsetCouple, alt: "Twee bemanningsleden kijken naar de zonsondergang" },
];

function MeevarenPage() {
  const { t } = useTranslation();
  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
          <div className="eyebrow text-background/70">{t("meevaren.heroEyebrow")}</div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-background md:text-7xl">
            {t("meevaren.heroTitle")}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <p className="font-display text-2xl leading-relaxed text-foreground/85 md:text-3xl">
          {t("meevaren.intro")}
        </p>
      </section>

      {/* Indeling van het schip */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="eyebrow">{t("meevaren.indelingEyebrow")}</div>
            <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">{t("meevaren.indelingTitle")}</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              {t("meevaren.indelingBody")}
            </p>
          </div>
          <div className="md:col-span-7">
            <dl className="divide-y divide-foreground/15 border-y border-foreground/15">
              {indelingKeys.map((k) => (
                <div key={k} className="grid grid-cols-3 gap-6 py-5">
                  <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">{t(`meevaren.indeling.${k}`)}</dt>
                  <dd className="col-span-2 text-foreground/85">{t(`meevaren.indeling.${k}Val`)}</dd>
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
              <div className="eyebrow">{t("meevaren.gebiedEyebrow")}</div>
              <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">{t("meevaren.gebiedTitle")}</h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground/80">
                {t("meevaren.gebiedBody")}
              </p>
              <ul className="mt-8 space-y-2 text-sm uppercase tracking-[0.2em] text-foreground/70">
                <li>· Mommark · Marstal · Middelfart</li>
                <li>· Kopenhagen · Svendborg · Heiligenhafen</li>
              </ul>
            </div>
            <div className="md:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-foreground/15 bg-background">
                <iframe
                  title="Vaargebied Oostzee"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=8.0%2C54.0%2C14.0%2C57.5&layer=mapnik"
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-foreground/55">
                {t("meevaren.gebiedNote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sfeerimpressie collage */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="max-w-2xl">
          <div className="eyebrow">{t("meevaren.sfeerEyebrow")}</div>
          <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">{t("meevaren.sfeerTitle")}</h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            {t("meevaren.sfeerBody")}
          </p>
        </div>
        <div className="mt-12 columns-1 gap-4 sm:columns-2 md:columns-3">
          {gallery.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="mb-3 block w-full break-inside-avoid object-cover md:mb-4"
            />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="eyebrow">{t("meevaren.faqEyebrow")}</div>
            <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">{t("meevaren.faqTitle")}</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              {t("meevaren.faqBody")}
            </p>
          </div>
          <dl className="mt-12 divide-y divide-foreground/15 border-y border-foreground/15">
            {faqKeys.map((n) => (
              <details key={n} className="group py-6">
                <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                  <dt className="font-display text-xl text-primary md:text-2xl">{t(`meevaren.faq.q${n}`)}</dt>
                  <span className="mt-1 shrink-0 text-2xl text-foreground/50 transition-transform group-open:rotate-45">+</span>
                </summary>
                <dd className="mt-4 max-w-3xl text-foreground/80 leading-relaxed">{t(`meevaren.faq.a${n}`)}</dd>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-24 text-primary-foreground">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <div className="eyebrow text-primary-foreground/60">{t("meevaren.ctaEyebrow")}</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">{t("meevaren.ctaTitle")}</h2>
          <p className="mt-6 text-primary-foreground/80">
            {t("meevaren.ctaBody")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="mailto:info@marie-galante.nl" className="inline-block border border-accent bg-accent px-8 py-3 text-xs uppercase tracking-[0.25em] text-accent-foreground hover:bg-transparent hover:text-accent">
              {t("nav.ikWilMee")}
            </a>
            <Link to="/boek-jouw-avontuur" className="inline-block border border-primary-foreground/40 px-8 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground hover:border-accent hover:text-accent">
              {t("meevaren.ctaBack")}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}