import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/")({
  component: AdminLogin,
  head: () => ({ meta: [{ title: "Admin · Marie Galante" }, { name: "robots", content: "noindex" }] }),
});

function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/boekingen" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fn = mode === "signin"
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin/boekingen` } });
    const { error } = await fn;
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/admin/boekingen" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="text-xs uppercase tracking-[0.25em] text-foreground/60 hover:text-foreground">
          ← terug naar de site
        </Link>
        <h1 className="mt-6 font-display text-3xl text-primary">
          {mode === "signin" ? "Inloggen" : "Account aanmaken"}
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          Beheer van dagtocht-boekingen. De allereerste registratie wordt automatisch admin.
        </p>
        <form onSubmit={submit} className="mt-8 grid gap-4">
          <div className="grid gap-2">
            <Label className="text-xs uppercase tracking-[0.2em]">E-mail</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label className="text-xs uppercase tracking-[0.2em]">Wachtwoord</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Bezig…" : mode === "signin" ? "Inloggen" : "Account aanmaken"}
          </Button>
          <button
            type="button"
            className="text-xs text-foreground/60 hover:text-foreground underline"
            onClick={() => { setError(null); setMode(mode === "signin" ? "signup" : "signin"); }}
          >
            {mode === "signin" ? "Nog geen account? Maak er een aan." : "Al een account? Log in."}
          </button>
        </form>
      </div>
    </div>
  );
}