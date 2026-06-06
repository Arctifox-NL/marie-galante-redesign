import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { listAvailableSlots, type AvailableSlot } from "@/lib/bookings.functions";
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
  const { t } = useTranslation();
  const fetchSlots = useServerFn(listAvailableSlots);
  const {
    data: slots = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trip-slots"],
    queryFn: () => fetchSlots(),
  });

  const grouped = groupByDate(slots);
  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
          <div className="eyebrow text-background/70">{t("dag.heroEyebrow")}</div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-background md:text-7xl">
            {t("dag.heroTitle")}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <p className="font-display text-2xl leading-relaxed text-foreground/85 md:text-3xl">
          {t("dag.intro")}
        </p>
      </section>

      {/* Praktische info */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="eyebrow">{t("dag.praktischEyebrow")}</div>
            <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">{t("dag.praktischTitle")}</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              {t("dag.praktischBody")}
            </p>

          </div>
          <div className="md:col-span-7">
            <dl className="divide-y divide-foreground/15 border-y border-foreground/15">
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">{t("dag.spec.vertrek")}</dt>
                <dd className="col-span-2 text-foreground/85">{t("dag.spec.vertrekVal")}</dd>
              </div>
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">{t("dag.spec.duur")}</dt>
                <dd className="col-span-2 text-foreground/85">{t("dag.spec.duurVal")}</dd>
              </div>
              <div className="grid grid-cols-3 gap-6 py-5">
                <dt className="text-xs uppercase tracking-[0.25em] text-foreground/55">{t("dag.spec.ervaring")}</dt>
                <dd className="col-span-2 text-foreground/85">{t("dag.spec.ervaringVal")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Ticket widget */}
      <section id="tickets" className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="eyebrow">{t("dag.ticketsEyebrow")}</div>
            <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">{t("dag.ticketsTitle")}</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              {t("dag.ticketsBody")}
            </p>
          </div>

          <div className="mt-12">
            {isLoading ? (
              <div className="flex min-h-[30vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <p className="text-foreground/70">
                De tickets laden op dit moment niet. Probeer het zo opnieuw.
              </p>
            ) : grouped.length === 0 ? (
              <p className="text-foreground/70">Er zijn op dit moment geen tochten beschikbaar.</p>
            ) : (
              <>
                <div className="mb-8 rounded-md border border-foreground/15 bg-background/60 p-5 text-sm text-foreground/80">
                  <strong className="text-foreground">Goed om te weten:</strong> bij slecht weer of
                  minder dan 8 boekingen gaat een tocht niet door. Je kunt dan kosteloos verschuiven
                  of we storten je geld terug. Tickets zijn niet anders inwisselbaar.
                </div>
                <div className="space-y-10">
                  {grouped.map((day) => (
                    <DayBlock key={day.date} day={day} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Privé charter */}
      <section id="charter" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="max-w-3xl">
          <div className="eyebrow">{t("dag.charterEyebrow")}</div>
          <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">
            {t("dag.charterTitle")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            {t("dag.charterBody")}
          </p>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-y border-foreground/20">
                <th className="py-4 pr-6 text-xs uppercase tracking-[0.25em] text-foreground/55">
                  {t("dag.charterTable.optie")}
                </th>
                <th className="py-4 pr-6 text-xs uppercase tracking-[0.25em] text-foreground/55">
                  {t("dag.charterTable.inbegrepen")}
                </th>
                <th className="py-4 text-xs uppercase tracking-[0.25em] text-foreground/55">
                  {t("dag.charterTable.prijs")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/15">
              <tr>
                <td className="py-6 pr-6 align-top font-display text-xl text-primary">
                  {t("dag.charterTable.kaalTitle")}
                </td>
                <td className="py-6 pr-6 align-top text-foreground/80">
                  {t("dag.charterTable.kaalIncl")}
                </td>
                <td className="py-6 align-top font-display text-xl text-foreground">
                  {t("dag.charterTable.kaalPrijs")}
                </td>
              </tr>
              <tr>
                <td className="py-6 pr-6 align-top font-display text-xl text-primary">
                  {t("dag.charterTable.drankTitle")}
                </td>
                <td className="py-6 pr-6 align-top text-foreground/80">
                  {t("dag.charterTable.drankIncl")}
                </td>
                <td className="py-6 align-top font-display text-xl text-foreground">
                  {t("dag.charterTable.drankPrijs")}
                </td>
              </tr>
              <tr>
                <td className="py-6 pr-6 align-top font-display text-xl text-primary">
                  {t("dag.charterTable.lunchTitle")}
                </td>
                <td className="py-6 pr-6 align-top text-foreground/80">
                  {t("dag.charterTable.lunchIncl")}
                </td>
                <td className="py-6 align-top font-display text-xl text-foreground">
                  {t("dag.charterTable.lunchPrijs")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12">
          <a
            href="mailto:info@marie-galante.nl"
            className="inline-block border border-accent bg-accent px-8 py-3 text-xs uppercase tracking-[0.25em] text-accent-foreground hover:bg-transparent hover:text-accent"
          >
            {t("dag.charterCta")}
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}

type DayGroup = { date: string; dateLabel: string; slots: AvailableSlot[] };

function groupByDate(slots: AvailableSlot[]): DayGroup[] {
  const map = new Map<string, DayGroup>();
  for (const s of slots) {
    const d = new Date(s.starts_at);
    const dateKey = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Berlin",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
    const label = new Intl.DateTimeFormat("nl-NL", {
      timeZone: "Europe/Berlin",
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(d);
    if (!map.has(dateKey)) map.set(dateKey, { date: dateKey, dateLabel: label, slots: [] });
    map.get(dateKey)!.slots.push(s);
  }
  return Array.from(map.values());
}

function timeLabel(iso: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function DayBlock({ day }: { day: DayGroup }) {
  return (
    <div>
      <h3 className="font-display text-2xl text-primary capitalize">{day.dateLabel}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {day.slots.map((s) => {
          const soldOut = s.status === "cancelled" || s.available <= 0;
          return (
            <div
              key={s.id}
              className="flex flex-col justify-between border border-foreground/15 bg-background p-5"
            >
              <div>
                <div className="font-display text-xl text-foreground">
                  {timeLabel(s.starts_at)} – {timeLabel(s.ends_at)}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-foreground/55">
                  Eckernförde
                </div>
                <div className="mt-3 text-sm text-foreground/70">
                  {soldOut
                    ? s.status === "cancelled"
                      ? "Geannuleerd"
                      : "Volgeboekt"
                    : `${s.available} van ${s.capacity} plekken vrij`}
                </div>
              </div>
              {soldOut ? (
                <span className="mt-5 inline-block border border-foreground/20 px-4 py-2 text-center text-xs uppercase tracking-[0.25em] text-foreground/50">
                  Niet beschikbaar
                </span>
              ) : (
                <Link
                  to="/dagtochten/boeken/$slotId"
                  params={{ slotId: s.id }}
                  className="mt-5 inline-block border border-accent bg-accent px-4 py-2 text-center text-xs uppercase tracking-[0.25em] text-accent-foreground hover:bg-transparent hover:text-accent"
                >
                  Boek deze tocht
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}