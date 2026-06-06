import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Loader2, LogOut, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { listAdminBookings, type AdminBooking } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/boekingen")({
  component: AdminBookings,
  head: () => ({ meta: [{ title: "Boekingen · Admin · Marie Galante" }, { name: "robots", content: "noindex" }] }),
});

function AdminBookings() {
  const navigate = useNavigate();
  const [authReady, setAuthReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
      setAuthReady(true);
      if (!data.session) navigate({ to: "/admin" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setHasSession(!!session);
      if (!session) navigate({ to: "/admin" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const fetchBookings = useServerFn(listAdminBookings);
  const { data: bookings = [], isLoading, error, refetch } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () => fetchBookings(),
    enabled: authReady && hasSession,
  });

  const grouped = useMemo(() => groupBySlot(bookings), [bookings]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin" });
  }

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="font-display text-lg text-primary">Marie Galante · Admin</Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => exportCsv(bookings)}>
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" /> Uitloggen
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <h1 className="font-display text-3xl text-primary md:text-4xl">Boekingen</h1>
        <p className="mt-2 text-sm text-foreground/70">
          Alle dagtochten en bijbehorende boekingen. Tochten met minder dan 8 personen halen het minimum nog niet.
        </p>

        {isLoading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="mt-10 rounded-md border border-red-300 bg-red-50 p-6 text-red-800">
            {(error as Error).message.includes("Forbidden")
              ? "Je bent ingelogd, maar nog geen admin. Vraag de eerste admin om je toe te voegen."
              : `Kon boekingen niet laden: ${(error as Error).message}`}
            <div className="mt-3">
              <Button size="sm" onClick={() => refetch()}>Opnieuw proberen</Button>
            </div>
          </div>
        ) : grouped.length === 0 ? (
          <p className="mt-10 text-foreground/70">Er zijn nog geen boekingen.</p>
        ) : (
          <div className="mt-10 space-y-10">
            {grouped.map((g) => (
              <SlotGroup key={g.slotId} group={g} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

type SlotGroupT = {
  slotId: string;
  starts_at: string;
  ends_at: string;
  bookings: AdminBooking[];
  totalPersons: number;
  totalPaidCents: number;
};

function groupBySlot(bookings: AdminBooking[]): SlotGroupT[] {
  const map = new Map<string, SlotGroupT>();
  for (const b of bookings) {
    if (!map.has(b.slot_id)) {
      map.set(b.slot_id, {
        slotId: b.slot_id,
        starts_at: b.starts_at,
        ends_at: b.ends_at,
        bookings: [],
        totalPersons: 0,
        totalPaidCents: 0,
      });
    }
    const g = map.get(b.slot_id)!;
    g.bookings.push(b);
    if (b.payment_status === "paid" || b.payment_status === "pending") {
      g.totalPersons += b.total_persons;
    }
    if (b.payment_status === "paid") g.totalPaidCents += b.amount_cents;
  }
  return Array.from(map.values()).sort((a, b) => a.starts_at.localeCompare(b.starts_at));
}

function SlotGroup({ group }: { group: SlotGroupT }) {
  const fmt = (iso: string) =>
    new Intl.DateTimeFormat("nl-NL", {
      timeZone: "Europe/Berlin",
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  const minHit = group.totalPersons >= 8;
  return (
    <section>
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-foreground/15 pb-2">
        <h2 className="font-display text-xl text-primary capitalize">
          {fmt(group.starts_at)} – {new Intl.DateTimeFormat("nl-NL", { timeZone: "Europe/Berlin", hour: "2-digit", minute: "2-digit" }).format(new Date(group.ends_at))}
        </h2>
        <div className="text-xs uppercase tracking-[0.2em] text-foreground/55">
          {group.totalPersons} pers ·{" "}
          <span className={minHit ? "text-green-700" : "text-red-700"}>
            {minHit ? "minimum gehaald" : `min. nog ${8 - group.totalPersons} nodig`}
          </span>{" "}
          · € {(group.totalPaidCents / 100).toFixed(2).replace(".", ",")} betaald
        </div>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-foreground/10 text-left text-xs uppercase tracking-[0.15em] text-foreground/55">
              <th className="py-2 pr-3">Naam</th>
              <th className="py-2 pr-3">E-mail</th>
              <th className="py-2 pr-3">Telefoon</th>
              <th className="py-2 pr-3">V / K / B</th>
              <th className="py-2 pr-3">Bedrag</th>
              <th className="py-2 pr-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {group.bookings.map((b) => (
              <tr key={b.id} className="border-b border-foreground/5">
                <td className="py-2 pr-3">{b.customer_name}</td>
                <td className="py-2 pr-3">
                  <a href={`mailto:${b.customer_email}`} className="underline">{b.customer_email}</a>
                </td>
                <td className="py-2 pr-3">
                  <a href={`tel:${b.customer_phone}`} className="underline">{b.customer_phone}</a>
                </td>
                <td className="py-2 pr-3">{b.adults} / {b.children} / {b.babies}</td>
                <td className="py-2 pr-3">€ {(b.amount_cents / 100).toFixed(2).replace(".", ",")}</td>
                <td className="py-2 pr-3">
                  <StatusBadge status={b.payment_status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-amber-100 text-amber-800",
    failed: "bg-red-100 text-red-800",
    refunded: "bg-blue-100 text-blue-800",
    cancelled: "bg-gray-200 text-gray-700",
  };
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs ${map[status] ?? "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}

function exportCsv(bookings: AdminBooking[]) {
  const header = ["datum","tijd","naam","email","telefoon","volwassen","kind","baby","totaal","bedrag_eur","status"];
  const rows = bookings.map((b) => {
    const d = new Date(b.starts_at);
    const date = new Intl.DateTimeFormat("nl-NL", { timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
    const time = new Intl.DateTimeFormat("nl-NL", { timeZone: "Europe/Berlin", hour: "2-digit", minute: "2-digit" }).format(d);
    return [date, time, b.customer_name, b.customer_email, b.customer_phone, b.adults, b.children, b.babies, b.total_persons, (b.amount_cents / 100).toFixed(2), b.payment_status];
  });
  const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `boekingen-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}