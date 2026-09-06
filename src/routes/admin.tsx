import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

import { getAuthClient, getDb, type Lead } from "@/lib/firebase";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — EduVision Study Room Leads" },
      { name: "description", content: "Private admin panel for EduVision Study Room enquiries." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin — EduVision Study Room Leads" },
      { property: "og:description", content: "Private admin panel for EduVision Study Room enquiries." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    (async () => {
      const auth = await getAuthClient();
      const { onAuthStateChanged } = await import("firebase/auth");
      unsub = onAuthStateChanged(auth, (user) => {
        setEmail(user?.email ?? null);
        setReady(true);
      });
    })().catch(() => setReady(true));
    return () => unsub?.();
  }, []);

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-hand text-2xl">Waking up the database…</p>
      </main>
    );
  }

  return email ? <LeadsDashboard email={email} /> : <LoginCard />;
}

function LoginCard() {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const auth = await getAuthClient();
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      await signInWithEmailAndPassword(auth, emailInput.trim(), password);
    } catch {
      setError("Wrong email or password. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border-4 border-foreground bg-card p-8 shadow-[8px_8px_0_0_hsl(var(--foreground))]"
      >
        <h1 className="font-display text-4xl leading-tight">Owner Login 🔐</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Only for the study room owner. Everyone else, shoo. 👋
        </p>

        <label className="mt-6 block">
          <span className="font-hand text-xl">Email</span>
          <input
            type="email"
            required
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="mt-1 w-full rounded-xl border-4 border-foreground bg-background px-4 py-3 outline-none"
            placeholder="owner@eduvision.com"
          />
        </label>

        <label className="mt-4 block">
          <span className="font-hand text-xl">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border-4 border-foreground bg-background px-4 py-3 outline-none"
            placeholder="••••••••"
          />
        </label>

        {error && <p className="mt-3 text-sm font-bold text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="btn-brutal mt-6 w-full rounded-xl border-4 border-foreground bg-primary px-6 py-3 text-lg font-bold text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Checking…" : "Let Me In"}
        </button>
      </form>
    </main>
  );
}

function LeadsDashboard({ email }: { email: string }) {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let unsub: (() => void) | undefined;
    (async () => {
      const db = await getDb();
      const { ref, query: dbQuery, orderByChild, onValue } = await import("firebase/database");
      unsub = onValue(
        dbQuery(ref(db, "leads"), orderByChild("createdAt")),
        (snap) => {
          const rows: Lead[] = [];
          snap.forEach((child) => {
            const v = (child.val() ?? {}) as Partial<Lead>;
            rows.push({
              id: child.key ?? "",
              name: v.name ?? "",
              phone: v.phone ?? "",
              submittedAt: v.submittedAt ?? "",
              createdAt: typeof v.createdAt === "number" ? v.createdAt : 0,
            });
          });
          setLeads(rows.reverse());
        },
        () => setError("Could not read leads. Check the database rules in Firebase."),
      );
    })().catch(() => setError("Could not connect to the database."));
    return () => unsub?.();
  }, []);

  const signOutNow = async () => {
    const auth = await getAuthClient();
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
  };

  const filtered = (leads ?? []).filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.phone.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl leading-tight md:text-5xl">Your Leads 📋</h1>
            <p className="mt-1 text-sm text-muted-foreground">Signed in as {email}</p>
          </div>
          <button
            onClick={signOutNow}
            className="rounded-xl border-4 border-foreground bg-card px-4 py-2 font-bold"
          >
            Log out
          </button>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name or number…"
          className="mt-6 w-full rounded-xl border-4 border-foreground bg-card px-4 py-3 outline-none"
        />

        {error && (
          <p className="mt-6 rounded-xl border-4 border-foreground bg-card p-4 font-bold text-destructive">
            {error}
          </p>
        )}

        {!error && leads === null && (
          <p className="mt-8 font-hand text-2xl">Loading enquiries…</p>
        )}

        {!error && leads !== null && filtered.length === 0 && (
          <p className="mt-8 rounded-xl border-4 border-dashed border-foreground p-6 text-center font-hand text-2xl">
            Nothing here yet. First enquiry will pop up live. ✨
          </p>
        )}

        <div className="mt-6 grid gap-4">
          {filtered.map((lead) => (
            <div
              key={lead.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-4 border-foreground bg-card p-5 shadow-[6px_6px_0_0_hsl(var(--foreground))]"
            >
              <div>
                <p className="text-xl font-bold">{lead.name || "—"}</p>
                <p className="text-sm text-muted-foreground">{lead.submittedAt}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${lead.phone}`}
                  className="rounded-xl border-4 border-foreground bg-background px-3 py-2 font-bold"
                >
                  {lead.phone}
                </a>
                <a
                  href={`https://wa.me/91${lead.phone.replace(/\D/g, "").slice(-10)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border-4 border-foreground bg-primary px-3 py-2 font-bold"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
