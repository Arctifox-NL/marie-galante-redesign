import { useState } from "react";
import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSlot, createBookingRequest } from "@/lib/bookings.functions";

const PRICE_ADULT = 36;
const PRICE_CHILD = 29;

export const Route = createFileRoute("/dagtochten/boeken/$slotId")({
  component: BookingPage,
  head: () => ({
    meta: [{ title: "Tocht boeken · Marie Galante" }],
  }),
});

function BookingPage() {
  const { slotId } = useParams({ from: "/dagtochten/boeken/$slotId" });
  const navigate = useNavigate();
  const fetchSlot = useServerFn(getSlot);
  const submitBooking = useServerFn(createBookingRequest);
  const { data: slot, isLoading, error } = useQuery({
    queryKey: ["slot", slotId],
    queryFn: () => fetchSlot({ data: { slotId } }),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const total = adults * PRICE_ADULT + children * PRICE_CHILD;
  const totalPersons = adults + children + babies;

  function dateLabel(iso: string) {
    return new Intl.DateTimeFormat("nl-NL", {
      timeZone: "Europe/Berlin",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setFormError("Vul je naam, e-mail en telefoonnummer in.");
      return;
    }
    if (totalPersons < 1) {
      setFormError("Kies minimaal 1 persoon.");
      return;
    }
    if (adults + children < 1) {
      setFormError("Een baby mag alleen mee samen met een kind of volwassene.");
      return;
    }
    if (slot && totalPersons > slot.available) {
      setFormError(`Er zijn nog maar ${slot.available} plekken beschikbaar.`);
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitBooking({
        data: {
          slotId,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          adults,
          children,
          babies,
        },
      });
      if ("error" in result) {
        setFormError(result.error);
        setSubmitting(false);
        return;
      }
      navigate({ to: "/dagtochten/bedankt", search: { booking_id: result.bookingId } as never });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Onbekende fout");
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </SiteLayout>
    );
  }
  if (error || !slot) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="font-display text-3xl text-primary">Tocht niet gevonden</h1>
          <p className="mt-4 text-foreground/70">Deze tocht bestaat niet of is niet meer beschikbaar.</p>
          <Link to="/dagtochten" className="mt-6 inline-block text-sm uppercase tracking-[0.25em] text-accent underline">
            ← terug naar dagtochten
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">
        <Link to="/dagtochten" className="text-xs uppercase tracking-[0.25em] text-foreground/60 hover:text-foreground">
          ← alle tochten
        </Link>
        <h1 className="mt-4 font-display text-4xl text-primary md:text-5xl">Boek je tocht</h1>
        <p className="mt-3 font-display text-2xl text-foreground capitalize">{dateLabel(slot.starts_at)}</p>
        <p className="mt-1 text-sm text-foreground/70">
          Vertrek vanuit Eckernförde · {slot.available} van {slot.capacity} plekken vrij
        </p>

        <form onSubmit={submit} className="mt-12 grid gap-8">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Naam" required>
                <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={120} required />
              </Field>
              <Field label="E-mail" required>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} required />
              </Field>
              <Field label="Telefoonnummer" required hint="Voor als de tocht door weer of te weinig boekingen verschuift.">
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={40} required />
              </Field>
            </div>

            <div className="border-y border-foreground/15 py-6">
              <h2 className="font-display text-xl text-primary">Aantal personen</h2>
              <div className="mt-4 grid gap-3">
                <Counter label="Volwassen" sub="vanaf 15 jaar · € 36,-" value={adults} setValue={setAdults} max={36} />
                <Counter label="Kind" sub="4 t/m 14 jaar · € 29,-" value={children} setValue={setChildren} max={36} />
                <Counter label="Baby" sub="0 t/m 3 jaar · gratis" value={babies} setValue={setBabies} max={36} />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-foreground/55">Totaal</div>
                <div className="font-display text-3xl text-foreground">€ {total.toFixed(2).replace(".", ",")}</div>
                <div className="text-xs text-foreground/60">{totalPersons} {totalPersons === 1 ? "persoon" : "personen"}</div>
              </div>
              <Button type="submit" size="lg" disabled={totalPersons < 1 || submitting}>
                {submitting ? "Versturen…" : "Boeking aanvragen →"}
              </Button>
            </div>

            {formError && <p className="text-sm text-red-600">{formError}</p>}

            <div className="border-t border-foreground/15 pt-6 text-sm text-foreground/70">
              <strong className="text-foreground">Annulering & verschuiving:</strong> bij slecht weer of
              minder dan 8 boekingen kan de tocht niet doorgaan. We bereiken je dan via e-mail of
              telefoon en zoeken een nieuwe datum. Lukt verschuiven niet, dan krijg je je geld terug.
            </div>
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-xs uppercase tracking-[0.2em] text-foreground/60">
        {label} {required && <span className="text-accent">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-foreground/55">{hint}</p>}
    </div>
  );
}

function Counter({
  label,
  sub,
  value,
  setValue,
  max,
}: {
  label: string;
  sub: string;
  value: number;
  setValue: (n: number) => void;
  max: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border border-foreground/10 bg-background px-4 py-3">
      <div>
        <div className="font-display text-lg text-foreground">{label}</div>
        <div className="text-xs text-foreground/60">{sub}</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="min"
          className="h-9 w-9 border border-foreground/30 text-lg hover:bg-foreground/5"
          onClick={() => setValue(Math.max(0, value - 1))}
          disabled={value <= 0}
        >
          −
        </button>
        <span className="w-6 text-center font-display text-lg">{value}</span>
        <button
          type="button"
          aria-label="plus"
          className="h-9 w-9 border border-foreground/30 text-lg hover:bg-foreground/5"
          onClick={() => setValue(Math.min(max, value + 1))}
          disabled={value >= max}
        >
          +
        </button>
      </div>
    </div>
  );
}