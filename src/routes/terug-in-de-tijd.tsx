import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import SiteLayout from "@/components/SiteLayout";
import photo1980SpicaStege from "@/assets/photos/1980-spica-stege.jpg";
import photo1980AutoRuim from "@/assets/photos/1980-auto-ruim.jpg";
import photo1980AutoHijsen from "@/assets/photos/1980-auto-hijsen.jpg";
import photo1980BouwEnkhuizen from "@/assets/photos/1980-bouw-enkhuizen.jpg";
import photo1980RompWater from "@/assets/photos/1980-romp-water.jpg";
import photo1980WerkDek from "@/assets/photos/1980-werk-dek.jpg";
import photo2014Bow from "@/assets/photos/2014-marie-galante-bow.jpg";
import photo2014Dek from "@/assets/photos/2014-dek-evenement.jpg";
import photo2014Zeilen from "@/assets/photos/2014-zeilen-golven.jpg";
import photo2016Bow from "@/assets/photos/2016-rotterdam-bow.jpg";
import photo2016Dek from "@/assets/photos/2016-rotterdam-dek.jpg";
import photo2016Stuurhut from "@/assets/photos/2016-rotterdam-stuurhut.jpg";
import photo2025Werf from "@/assets/photos/2025-werf.jpg";
import photo2025Masten from "@/assets/photos/2025-masten-eraf.jpg";
import photo2025Mist from "@/assets/photos/2025-rotterdam-mist.jpg";
import heroImage from "@/assets/photos/hero-terug-in-de-tijd.jpg";

export const Route = createFileRoute("/terug-in-de-tijd")({
  component: HistoryPage,
  head: () => ({
    meta: [
      { title: "Geschiedenis · Marie Galante" },
      { name: "description", content: "De geschiedenis van zeillogger Marie Galante, gebouwd in 1915. Van visserschip onder Duitse, Deense en Zweedse vlag tot zeilend passagiersschip op de Oostzee." },
    ],
  }),
});

const HERO = heroImage;

type Entry = {
  year: string;
  title: string;
  body?: string;
  images?: string[];
};

const timeline: Entry[] = [
  {
    year: "2025",
    title: "Marie Galante — See the Sea",
    body: "Het nieuwe tijdperk is aangebroken: Marie Galante mocht weer weg van de kade voor de verkoop keur. De masten zijn eraf gehaald en de huiddikte gemeten. Met trots treden de nieuwe eigenaren aan: Lex van der Linden en Lotte van Boesschoten. Met een flinke to do lijst, veel energie en het voornemen hard te werken beginnen ze aan het avontuur om de Marie Galante weer onder keur te brengen.",
    images: [
      photo2025Werf,
      photo2025Masten,
      photo2025Mist,
    ],
  },
  {
    year: "2016",
    title: "Naar Rotterdam",
    body: "Na een bewogen tijd en een intense werfperiode komt er een einde aan het tijdperk van de stichting. Een schip dat stilligt gaat snel achteruit — gelukkig was daar Pieter Boot. Als ervaren charteraar ontstond het idee om het schip naar Rotterdam te brengen, waar ze als Airbnb-locatie aan de kade zou liggen met als doel terug in de vaart te komen.",
    images: [
      photo2016Bow,
      photo2016Dek,
      photo2016Stuurhut,
    ],
  },
  {
    year: "2014",
    title: "Stichting Loggerbehoud",
    body: "Na Kees Rol neemt stichting Loggerbehoud het stokje over. De stichting neemt zowel de Tradewind als de Marie Galante onder haar hoede. Ze straalt nog zeker twee jaar tijdens evenementen op de Oostzee, zoals tijdens de Kieler Woche van 2014.",
    images: [
      photo2014Bow,
      photo2014Dek,
      photo2014Zeilen,
    ],
  },
  {
    year: "1980",
    title: "Het Marie Galante-tijdperk breekt aan",
    body: "Kees Rol wordt bekroond tot nieuwe eigenaar van de Spica, en zal haar omdopen tot Marie Galante. In de volgende twee jaar verbouwt hij het oude vrachtschip om tot een zeilend passagiersschip met thuishaven Enkhuizen.",
    images: [
      photo1980SpicaStege,
      photo1980AutoRuim,
      photo1980AutoHijsen,
      photo1980BouwEnkhuizen,
      photo1980RompWater,
      photo1980WerkDek,
    ],
  },
  { year: "1978", title: "Spica", body: "Verkocht aan H. J. H. Hansen, omgedoopt tot Spica met thuishaven Stege. Varend onder Deense vlag." },
  { year: "1974", title: "Metrig", body: "Verkocht aan Eigil Christensen, omgedoopt tot Metrig met thuishaven Hov. Varend onder Deense vlag." },
  { year: "1971", title: "Wiston", body: "Verkocht aan J. Pedersen, omgedoopt tot Wiston met thuishaven Vejle. Varend onder Deense vlag." },
  { year: "1963", title: "Edca", body: "Verkocht aan C.P. Hendriksen, omgedoopt tot Edca en geregistreerd in Svendborg en later Odense. Varend onder Deense vlag." },
  { year: "1958", title: "Nieuw bedrijf, nieuwe rol", body: "Het schip wordt geregistreerd onder Thorvald Olofson uit Skärhamm. De zeilen zijn vanaf nu op papier de secundaire voortstuwingsmethode." },
  { year: "1951", title: "Ornen", body: "Verkocht aan G. E. Olssen, omgedoopt tot Ornen, varend onder de Zweedse vlag met Uetersen als thuishaven." },
  { year: "1945", title: "Naar Uetersen", body: "De eigenaren ontsnappen van Stettin naar Uetersen. Uetersen is vanaf nu de nieuwe thuishaven." },
  { year: "1940", title: "Wilhelm Schiermann", body: "Verkocht aan Heinrich Sandkamp uit Stettin. Een sterkere motor wordt geplaatst en het schip omgedoopt tot Wilhelm Schiermann. Ze blijft onder Duitse vlag varen." },
  { year: "1931", title: "Bremen-Vegesacker Fischerei", body: "Varend voor de Bremen-Vegesacker Fischerei Gesellschaft (1931–1939)." },
  { year: "1926", title: "Eerste motor", body: "Installatie van de eerste motor aan boord." },
  { year: "1915", title: "Gebouwd als Elsfleth", body: "In 1915 werd de Elsfleth gebouwd bij C. Lühring. De komende jaren zal ze als zeilend visserijschip dienen." },
];

function HistoryPage() {
  const { t } = useTranslation();
  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/65" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
          <div className="eyebrow text-background/70">{t("history.heroEyebrow")}</div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-background md:text-7xl">{t("history.heroTitle")}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center md:px-10">
        <p className="font-display text-2xl leading-relaxed text-foreground/85 md:text-3xl">
          {t("history.intro")}
        </p>
        <a href="mailto:info@marie-galante.nl" className="mt-8 inline-block border-b border-accent pb-1 text-xs uppercase tracking-[0.25em] text-primary hover:text-accent">
          {t("history.share")}
        </a>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32 md:px-10">
        <ol className="relative space-y-20 md:space-y-28 md:border-l md:border-border md:pl-16">
          {timeline.map((e) => (
            <li key={e.year} className="relative">
              <div className="absolute -left-[4.4rem] top-2 hidden h-2 w-2 rounded-full bg-accent md:block" />
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-10">
                <div className="font-display text-5xl text-accent md:w-28 md:text-6xl">{e.year}</div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl text-primary md:text-3xl">{e.title}</h3>
                  {e.body && <p className="mt-4 max-w-2xl text-foreground/80">{e.body}</p>}
                </div>
              </div>
              {e.images && (
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-5">
                  {e.images.map((src) => (
                    <img key={src} src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>
    </SiteLayout>
  );
}