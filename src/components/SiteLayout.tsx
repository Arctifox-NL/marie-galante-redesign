import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/boek-jouw-avontuur", label: "Boek je avontuur" },
  { to: "/terug-in-de-tijd", label: "Terug in de tijd" },
  { to: "/logboek", label: "Logboek" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <Link to="/" className="flex items-center gap-3 font-display text-xl tracking-[0.3em] text-background md:text-2xl">
          <img src={logo} alt="Marie Galante logo" className="h-12 w-12 brightness-0 invert md:h-14 md:w-14" />
          <span className="hidden sm:inline">MARIE&nbsp;GALANTE</span>
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {nav.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[0.72rem] uppercase tracking-[0.28em] text-background/85 transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="text-background md:hidden"
          aria-label="Menu"
        >
          <span className="block h-px w-7 bg-current" />
          <span className="mt-1.5 block h-px w-7 bg-current" />
          <span className="mt-1.5 block h-px w-5 bg-current" />
        </button>
      </div>
      {open && (
        <div className="md:hidden">
          <div className="mx-6 rounded-md bg-primary/95 backdrop-blur px-6 py-6 text-primary-foreground">
            {nav.slice(1).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm uppercase tracking-[0.2em]"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3 md:px-10">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Marie Galante logo" className="h-14 w-14 brightness-0 invert" />
            <span className="font-display text-2xl tracking-[0.25em]">MARIE GALANTE</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Een zeillogger uit 1915. Terug op weg naar de Oostzee, vanuit de Veerhaven in Rotterdam.
          </p>
        </div>
        <div>
          <div className="eyebrow text-primary-foreground/60">Navigatie</div>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-accent">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow text-primary-foreground/60">Contact</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="mailto:info@marie-galante.nl" className="hover:text-accent">info@marie-galante.nl</a></li>
            <li>Veerhaven, Rotterdam</li>
            <li>
              <a href="https://www.instagram.com/mariegalante1915/" target="_blank" rel="noreferrer" className="hover:text-accent">
                Instagram @mariegalante1915
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-6 text-center text-xs uppercase tracking-[0.25em] text-primary-foreground/50">
        Lex van der Linden & Lotte van Boesschoten · sinds 2025
      </div>
    </footer>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}