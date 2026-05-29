## Doel
Een meertalige site (Nederlands, Engels, Duits) met een taalkiezer in de header. Bezoekers kunnen schakelen en hun keuze wordt onthouden.

## Aanpak

**Library:** `react-i18next` + `i18next` + `i18next-browser-languagedetector` — de standaard voor React-i18n, werkt prima met TanStack Start (client-side detectie, SSR-veilig met defaults op NL).

**Structuur:**
```
src/i18n/
  index.ts              -- i18next init
  locales/
    nl.json             -- alle Nederlandse teksten
    en.json             -- Engelse vertalingen
    de.json             -- Duitse vertalingen
```

**Componenten:**
- `LanguageSwitcher` toegevoegd in `SiteHeader` (desktop én mobiel): NL · EN · DE als compacte links/dropdown, huidige taal gemarkeerd.
- Keuze opgeslagen in `localStorage` via languagedetector.

**Vertaling pagina's:** Alle zichtbare teksten op deze routes worden door `useTranslation()` keys vervangen:
- `index.tsx` (home/hero/about/tracker/gallery/instagram)
- `boek-jouw-avontuur.tsx`
- `dagtochten.tsx`
- `meevaren-oostzee.tsx`
- `terug-in-de-tijd.tsx`
- `logboek.tsx` + detail (UI-chrome; blogposts zelf blijven NL — die staan in `data/logbook.ts`, vertaal ik niet tenzij gewenst)
- `tracker.tsx`
- `SiteHeader` nav-labels + "Ik wil mee"-knop
- `SiteFooter` (Navigatie/Contact labels + tagline)

**Wat NIET vertaald wordt (tenzij je dat wilt):**
- Eigennamen: "Marie Galante", "Lex & Lotte", "Veerhaven Rotterdam"
- Logboek-artikelen zelf (lange verhalende content in `src/data/logbook.ts`) — geef aan of je deze ook in EN/DE wilt; dat is veel handvertaalwerk.
- `<head>` meta titles/descriptions per route blijven NL in v1 (kan later per taal).

## Vragen voordat ik begin

1. **Logboek-artikelen:** ook vertalen naar EN/DE, of alleen de UI eromheen? (Vertalen = veel werk + jij moet de inhoud uiteindelijk redigeren.)
2. **Vertaalkwaliteit:** ik schrijf zelf vloeiende EN/DE vertalingen op basis van de NL-teksten. Akkoord, of wil je liever placeholders die jij later invult?
