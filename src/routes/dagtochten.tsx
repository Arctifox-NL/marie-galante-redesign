import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://v1.widget.shop.weeztix.com/injector.js"]'
    );
    if (existing) {
      existing.remove();
    }
    const script = document.createElement("script");
    script.src = "https://v1.widget.shop.weeztix.com/injector.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);
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

          {/* Weeztix shop embed */}
          <div className="mt-12 bg-background p-4 md:p-8">
            <div
              className="ot-iframe"
              data-ot-url="https://shop.weeztix.com/a5951f33-5e97-11f1-8e27-d65b0659bc31"
              data-ot-guid="a5951f33-5e97-11f1-8e27-d65b0659bc31"
            />
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