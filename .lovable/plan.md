## Wat we gaan bouwen

Een eigen dagtocht-boekingssysteem voor Eckernförde (1 t/m 19 juli), met online betaling via Stripe en automatische bevestigingsmails. De huidige Shopify-shop blijft staan voor merchandise.

### Het aanbod
- **Periode:** wo 1 juli t/m zo 19 juli 2026
- **Vaardagen:** woensdag t/m zondag
- **Tijdsloten per dag:**
  - Wo–vr: 14:00–16:00 en 20:00–22:00
  - Za & zo: 14:00–16:00, 17:00–19:00 en 20:00–22:00
- **Capaciteit:** 36 personen per tocht
- **Tickets:**
  - Baby (0–3): € 0
  - Kind (4–14): € 29
  - Volwassen: € 36
- **Doorgaans voorwaarden** duidelijk zichtbaar: bij slecht weer of minder dan 8 boekingen gaat de tocht niet door → verschuiven of geld terug.

### Klantflow
1. Klant kiest een datum en tijd op de dagtochten-pagina.
2. Vult naam, e-mail, telefoonnummer + aantal baby/kind/volwassen in.
3. Betaalt direct via Stripe (iDEAL/kaart).
4. Krijgt een automatische bevestigingsmail met de tocht-info, jouw contactgegevens en annulerings-voorwaarden.
5. Boeking en betaling worden vastgelegd in de database.

### Wat jij krijgt (admin)
- Een afgeschermde admin-pagina `/admin/boekingen` (alleen voor jou na inloggen).
- Per tocht-slot: hoeveel personen geboekt, hoeveel plekken vrij, of de minimum van 8 gehaald is.
- Per boeking: naam, e-mail, telefoon, aantal tickets, betaalstatus.
- Knop "tocht annuleren" → markeert het slot en stuurt alle geboekte klanten in één keer een mail (later toe te voegen).
- Export naar CSV voor losse communicatie.

---

## Technische opzet (voor de volledigheid)

### Backend (Lovable Cloud / Supabase)
Tabellen:
- `trip_slots` — datum, starttijd, eindtijd, capaciteit (36), min_bookings (8), status (`scheduled` / `cancelled`).
- `ticket_types` — `baby` (€0), `child` (€29), `adult` (€36).
- `bookings` — slot_id, naam, email, telefoon, totaal personen per type, totaalbedrag, stripe_session_id, betaalstatus, created_at.
- `user_roles` — voor admin-toegang (security-definer `has_role()` zoals best practice).

RLS:
- Iedereen mag actieve `trip_slots` lezen.
- Boekingen worden via server function aangemaakt (geen directe client-write).
- Alleen `admin` mag alle boekingen zien.

Server functions (TanStack `createServerFn`):
- `listAvailableSlots` — geeft alle slots + resterende plekken terug.
- `createCheckoutSession` — valideert beschikbaarheid, maakt een Stripe Checkout Session, schrijft boeking als `pending`.
- Webhook `/api/public/webhooks/stripe` — verifieert signature, zet boeking op `paid`, triggert bevestigingsmail.
- `listBookings` (admin) — alle boekingen met filter per slot.

### Frontend
- `/dagtochten` → kalender met beschikbare slots, klik opent boekingsformulier (modal/route).
- `/dagtochten/boeken/$slotId` → formulier + checkout-knop.
- `/dagtochten/bedankt` → na succesvolle betaling.
- `/admin/login` + `/admin/boekingen` → afgeschermd via Supabase Auth + admin-rol.

### Email (Lovable Emails)
- Template `booking-confirmation.tsx` met datum, tijd, aantal personen, totaalbedrag, jouw contact + annuleringsvoorwaarden.
- Verstuurd vanuit de Stripe webhook na succesvolle betaling.

### Stripe
- Lovable Payments (Stripe) — geen eigen Stripe-account nodig, iDEAL en kaart standaard aan, test-modus tot je live gaat.
- Bij annulering door jou: handmatig terugbetalen vanuit het Stripe-dashboard (geld-terug-garantie blijft mogelijk).

---

## Volgorde van implementatie

Omdat dit veel onderdelen heeft, doen we het stap voor stap. Elke stap eindigt met iets dat werkt:

1. **Lovable Cloud + Stripe Payments aanzetten** (vereist Pro-plan).
2. **Database + slots aanmaken** voor 1–19 juli volgens jouw schema.
3. **Boekingspagina + formulier + Stripe checkout** (klanten kunnen boeken en betalen).
4. **Bevestigingsmail** via Lovable Emails.
5. **Admin-paneel** om boekingen te zien en exporteren.
6. **Slot-annuleren + bulk-mail** naar geboekte klanten.

---

## Wat ik van jou nog nodig heb voor we starten

- **Jouw contactgegevens** voor in de bevestigingsmail (telefoonnummer + e-mailadres die klanten mogen gebruiken).
- **Adres / vertrekplek in Eckernförde** (haven, steiger).
- **Jouw Lovable account is Pro?** Stripe Payments vereist Pro of hoger — anders kunnen we stap 1 niet voltooien.
- **Inlog voor jou als admin** — welk e-mailadres wil je gebruiken om straks de boekingen in te zien?

Zodra je dit bevestigt (of meteen "ga maar door" zegt), start ik met stap 1.