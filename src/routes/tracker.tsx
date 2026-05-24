import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";

const MMSI = "244556000";
const EMBED_URL = `https://www.marinetraffic.com/en/ais/embed/zoom:8/centery:54.5/centerx:11/maptype:4/shownames:true/mmsi:${MMSI}/shipid:0/fleet:/fleet_id:/vtypes:/showmenu:false/remember:false`;
const FULL_URL = `https://www.marinetraffic.com/en/ais/details/ships/mmsi:${MMSI}`;

export const Route = createFileRoute("/tracker")({
  component: TrackerPage,
  head: () => ({
    meta: [
      { title: "Live Tracker — Volg de Marie Galante" },
      { name: "description", content: "Volg het zeilschip Marie Galante live op de kaart via MarineTraffic. Zie waar we nu varen of voor anker liggen." },
      { property: "og:title", content: "Live Tracker — Volg de Marie Galante" },
      { property: "og:description", content: "Volg het zeilschip Marie Galante live op de kaart via MarineTraffic." },
    ],
  }),
});

function TrackerPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12 md:px-10 md:pt-40">
        <div className="eyebrow">Live aan boord</div>
        <h1 className="mt-4 font-display text-4xl leading-tight text-primary md:text-6xl">
          Volg de Marie Galante live
        </h1>
        <p className="mt-6 max-w-2xl text-foreground/75 md:text-lg">
          Via MarineTraffic kun je realtime zien waar we ons bevinden — onderweg over de Oostzee, of stilliggend in een Deense haven. De kaart wordt automatisch bijgewerkt zolang er een AIS-signaal is.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 md:px-10 md:pb-36">
        <div className="aspect-[16/10] w-full overflow-hidden border border-border bg-muted shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]">
          <iframe
            src={EMBED_URL}
            title="Live positie Marie Galante op MarineTraffic"
            width="100%"
            height="100%"
            frameBorder={0}
            scrolling="no"
            allow="fullscreen"
            className="h-full w-full"
          />
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Kaart powered by{" "}
          <a href={FULL_URL} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            MarineTraffic ↗
          </a>
        </p>
      </section>
    </SiteLayout>
  );
}