import { useTranslation } from "react-i18next";
import "@/i18n";

const langs = ["nl", "en", "de"] as const;

export function LanguageSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "nl").slice(0, 2);
  const base = tone === "light" ? "text-background/70" : "text-primary/60";
  const active = tone === "light" ? "text-background" : "text-primary";
  return (
    <div className="flex items-center gap-1 text-[0.65rem] uppercase tracking-[0.25em]" aria-label={t("lang.label")}>
      {langs.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className={base}>·</span>}
          <button
            type="button"
            onClick={() => i18n.changeLanguage(l)}
            className={`transition-colors hover:text-accent ${current === l ? active : base}`}
            aria-current={current === l ? "true" : undefined}
          >
            {t(`lang.${l}`)}
          </button>
        </span>
      ))}
    </div>
  );
}

export default LanguageSwitcher;