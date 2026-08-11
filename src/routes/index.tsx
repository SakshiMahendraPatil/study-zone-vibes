import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Phone, MapPin, Wifi, Volume2, Armchair, Sparkles, Star, Clock, ArrowRight, Check, X, Coffee, Pencil, Lightbulb, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import heroAsset from "@/assets/eduvision-hall.png.asset.json";
import deskAsset from "@/assets/eduvision-desks.webp.asset.json";
import g1 from "@/assets/gallery-signage.jpeg.asset.json";
import g2 from "@/assets/gallery-wide.jpeg.asset.json";
import g3 from "@/assets/gallery-fan.jpeg.asset.json";
import g4 from "@/assets/gallery-cubicles.jpeg.asset.json";
const heroImg = heroAsset.url;
const deskImg = deskAsset.url;

const GALLERY = [
  { src: g2.url, caption: "Your actual corner of paradise. Silence included, free of charge.", tape: "bg-lavender", rot: "-rotate-2" },
  { src: g4.url, caption: "Your dedicated seat. Just waiting for your laptop and a mountain of notes.", tape: "bg-mint", rot: "rotate-2" },
  { src: g1.url, caption: "Check that ambience! Bright enough for study, cozy enough to stay sane.", tape: "bg-tangerine/70", rot: "-rotate-1" },
  { src: g3.url, caption: "The Wi-Fi router (glowing with pure, uninterrupted speed ⚡️).", tape: "bg-butter", rot: "rotate-1" },
];


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200" },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#vibe", label: "The Vibe" },
  { href: "#gallery", label: "Peek Inside" },
  { href: "#damage", label: "The Damage" },
  { href: "#reviews", label: "Word on the Street" },
  { href: "#find", label: "Find Us" },
];

function Index() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollGallery = (dir: number) => {
    const el = galleryRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [lightbox]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* NAV — sticky top bar */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-5 md:py-4">
          <a href="#top" className="wobble-hover inline-flex -rotate-2 items-center gap-2 rounded-xl border-[2.5px] border-ink bg-butter px-2 py-1 shadow-brutal-sm md:px-3 md:py-1.5">
            <Sparkles className="h-4 w-4" />
            <span className="font-display text-sm tracking-tight md:text-lg">EduVision Study Room</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((l) => (
              <a key={l.href} href={l.href} className="relative font-medium hover:text-tangerine">
                {l.label}
              </a>
            ))}
          </nav>
          <button type="button" onClick={() => setContactOpen(true)} className="btn-sticker hidden md:inline-flex">
            Talk to Us <MessageCircle className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="btn-sticker grid h-10 w-10 place-items-center !p-0"
              aria-label="Talk to Us"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
            <button
              className="rounded-lg border-[2.5px] border-ink bg-card px-3 py-2"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="mt-1 block h-0.5 w-5 bg-ink" />
              <span className="mt-1 block h-0.5 w-5 bg-ink" />
            </button>
          </div>
        </header>
        {open && (
          <div className="relative mx-auto max-w-7xl px-5 pb-4 md:hidden">
            <div className="card-brutal p-4">
              {NAV.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 font-semibold">{l.label}</a>
              ))}
              <button type="button" onClick={() => { setOpen(false); setContactOpen(true); }} className="btn-sticker mt-3 w-full">
                Talk to Us <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <main className="relative overflow-x-hidden">
        {/* decorative blobs */}
        <div className="blob left-[-120px] top-[10%] h-[300px] w-[300px] bg-lavender/60" />
        <div className="blob right-[-100px] top-[40%] h-[260px] w-[260px] bg-mint/60" style={{ animationDelay: "-4s" }} />
        <div className="blob left-[20%] bottom-[10%] h-[220px] w-[220px] bg-butter/70" style={{ animationDelay: "-8s" }} />



      {/* HERO */}
      <section id="top" className="relative mx-auto max-w-7xl px-5 pt-6 pb-24 md:pt-14">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <span className="inline-flex -rotate-2 items-center gap-2 rounded-full border-[2px] border-ink bg-lavender px-3 py-1 font-hand text-lg">
              <span className="inline-block h-2 w-2 rounded-full bg-tangerine" />
              Kolhapur's quietest corner
            </span>
            <h1 className="mt-5 font-sans text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Stop Studying on Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Bed.</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-4 -rotate-1 bg-tangerine/70" />
              </span>{" "}
              It's <span className="text-tangerine">Not Working.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Get off the mattress and get into the zone. Pin-drop silence, zero distractions,
              and your very own permanent desk in the heart of Kolhapur.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#damage" className="btn-brutal !bg-tangerine !text-cream text-base">
                Claim Your Free Trial <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:08262900150"
                className="inline-flex items-center gap-2 rounded-xl border-[2.5px] border-ink bg-transparent px-5 py-3 font-bold hover:bg-ink hover:text-cream"
              >
                <Phone className="h-4 w-4" /> 082629 00150
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4 font-hand text-xl text-muted-foreground">
              <span className="text-tangerine">★★★★★</span>
              <span>4.8 / 5 — students actually like us</span>
            </div>
          </div>

          {/* polaroid stack */}
          <div className="relative mx-auto h-[520px] w-full max-w-lg">
            <div className="polaroid absolute left-2 top-4 w-[74%] rotate-[-6deg]">
              <span className="tape-strip left-1/2 top-[-14px] -translate-x-1/2 rotate-[-4deg]" />
              <img src={heroImg} alt="Silent study hall at EduVision" width={800} height={800} className="aspect-square h-auto w-full object-cover" />
              <p className="mt-3 text-center font-hand text-2xl">the silent zone ✨</p>
            </div>
            <div className="polaroid absolute bottom-0 right-0 w-[62%] rotate-[7deg]">
              <span className="tape-strip left-[-20px] top-6 rotate-[-30deg]" />
              <img src={deskImg} alt="Cozy dedicated study desk" width={600} height={600} loading="lazy" className="aspect-square h-auto w-full object-cover" />
              <p className="mt-3 text-center font-hand text-2xl">your desk — for real</p>
            </div>
            <div className="polaroid absolute left-0 bottom-4 w-[55%] rotate-[-8deg] z-[-1]">
              <span className="tape-strip right-[-15px] top-8 rotate-[25deg]" />
              <img src={g2.url} alt="Study room view 1" width={500} height={500} loading="lazy" className="aspect-square h-auto w-full object-cover" />
              <p className="mt-3 text-center font-hand text-xl">study vibes 📚</p>
            </div>
            <div className="polaroid absolute right-4 top-20 w-[50%] rotate-[5deg] z-[-1]">
              <span className="tape-strip left-1/2 top-[-12px] -translate-x-1/2 rotate-[3deg]" />
              <img src={g4.url} alt="Study room view 2" width={500} height={500} loading="lazy" className="aspect-square h-auto w-full object-cover" />
              <p className="mt-3 text-center font-hand text-xl">focus mode 🔥</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative z-10 border-y-[2.5px] border-ink bg-ink py-4 text-cream">
        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center gap-10 whitespace-nowrap font-display text-2xl">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-10">
                {["PIN-DROP SILENCE", "★", "FAST WI-FI", "★", "OPEN 6AM – 12AM", "★", "PERMANENT DESK", "★", "₹600 / MONTH", "★", "TARABAI PARK, KOLHAPUR", "★"].map((t, j) => (
                  <span key={j} className={j % 2 ? "text-tangerine" : ""}>{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* THE VIBE */}
      <section id="vibe" className="relative mx-auto max-w-7xl px-5 py-24">
        <div className="mb-14 max-w-2xl">
          <p className="font-hand text-2xl text-tangerine">— the vibe —</p>
          <h2 className="mt-2 text-5xl md:text-6xl">
            What you get for<br/> your grind.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Volume2,
              title: "Hush-Hush Zones",
              body: "A place full of silence and the absolute best ambience to actually get things done.",
              bg: "bg-butter",
              rot: "rotate-[-2deg]",
            },
            {
              icon: Sparkles,
              title: "Vibe Check Passed",
              body: "Nice environment with super clean, modern interiors. No dust bunnies, promise.",
              bg: "bg-lavender",
              rot: "rotate-[1.5deg]",
            },
            {
              icon: Armchair,
              title: "No More Back Pain",
              body: "Sitting arrangements that are actually nice and designed for the long grinds.",
              bg: "bg-mint",
              rot: "rotate-[-1deg]",
            },
          ].map((f) => (
            <div key={f.title} className={`card-brutal ${f.bg} ${f.rot} wobble-hover p-7`}>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border-[2px] border-ink bg-cream">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-2xl">{f.title}</h3>
              <p className="mt-3 text-ink/80">{f.body}</p>
              <p className="mt-4 font-hand text-xl">✓ verified by real students</p>
            </div>
          ))}
        </div>

      </section>

      {/* PHOTO GALLERY */}
      <section id="gallery" className="relative mx-auto max-w-7xl px-5 py-24">
        {/* decorative background */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="blob left-[5%] top-[15%] h-56 w-56 bg-lavender/50" />
          <div className="blob right-[8%] top-[50%] h-48 w-48 bg-mint/60" style={{ animationDelay: "-6s" }} />
          <svg className="absolute left-[12%] top-[8%] h-16 w-16 -rotate-12 text-tangerine/70" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M10 60 Q 25 40, 40 60 T 70 60 T 95 55" strokeLinecap="round" />
          </svg>
          <div className="absolute right-[15%] top-[6%] font-hand text-4xl -rotate-6 text-ink/40">click me! →</div>
          <div className="absolute left-[45%] bottom-[10%] font-hand text-5xl rotate-3 text-tangerine/40">✱</div>
        </div>

        <div className="mb-14 max-w-3xl">
          <p className="font-hand text-2xl text-tangerine">— reality check —</p>
          <h2 className="mt-2 text-5xl md:text-6xl">
            Peek Inside!{" "}
            <span className="inline-block rotate-6">📸</span>
            <span className="inline-block -rotate-6">👀</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            No digital renders, no fake AI stock photos. Just the actual, real-life
            pin-drop silence waiting for you.
          </p>
        </div>

        <p className="mb-4 font-hand text-2xl -rotate-1 text-ink/70">Swipe to explore 👈👉</p>

        <div className="relative">
          {/* desktop arrows */}
          <button
            type="button"
            onClick={() => scrollGallery(-1)}
            aria-label="Previous photo"
            className="btn-sticker absolute left-[-10px] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 !p-0 md:inline-flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => scrollGallery(1)}
            aria-label="Next photo"
            className="btn-sticker absolute right-[-10px] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 !p-0 md:inline-flex"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            ref={galleryRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-2 py-10 md:px-10"
          >
            {GALLERY.map((p, i) => (
              <figure
                key={p.src}
                className={`relative w-[80vw] max-w-[420px] shrink-0 snap-center ${p.rot} wobble-hover`}
              >
                {/* doodle behind frame */}
                {i === 0 && <Coffee className="absolute -left-6 -top-6 h-10 w-10 -rotate-12 text-ink/50" />}
                {i === 1 && <Pencil className="absolute -right-5 -top-6 h-10 w-10 rotate-45 text-tangerine/70" />}
                {i === 2 && <Lightbulb className="absolute -left-6 -bottom-4 h-10 w-10 -rotate-12 text-butter" fill="currentColor" />}
                {i === 3 && <Sparkles className="absolute -right-5 -top-6 h-10 w-10 rotate-12 text-tangerine" />}

                <button
                  type="button"
                  onClick={() => setLightbox(p.src)}
                  className="polaroid group relative block w-full cursor-zoom-in bg-white"
                  aria-label="Open photo"
                >
                  <span className={`tape-strip left-1/2 top-[-14px] -translate-x-1/2 ${i % 2 ? "rotate-[3deg]" : "-rotate-[4deg]"} ${p.tape}`} />
                  {/* Image is uncropped: object-contain + natural height */}
                  <img
                    src={p.src}
                    alt={p.caption}
                    loading="lazy"
                    className="block h-auto max-h-[420px] w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  <figcaption className="mt-3 text-center font-hand text-2xl leading-tight text-ink">
                    {p.caption}
                  </figcaption>
                </button>
              </figure>
            ))}
          </div>
        </div>


        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="font-hand text-2xl">Vibe check passed? Let's talk about your new spot.</p>
          <a href="#damage" className="btn-brutal !bg-tangerine !text-ink rotate-1">
            Show Me the Plans <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>


      {/* THE DAMAGE */}

      <section id="damage" className="relative mx-auto max-w-7xl px-5 py-24">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-hand text-2xl text-tangerine">— the damage —</p>
            <h2 className="mt-2 text-5xl md:text-6xl">Three plans.<br/>Zero drama.</h2>
          </div>
          <p className="max-w-sm text-muted-foreground">No credit card gymnastics. No hidden charges.
            Just show up and study.</p>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-3">
          {/* Test Drive */}
          <div className="card-brutal relative -rotate-1 p-7">
            <span className="tape-strip left-8 top-[-14px] rotate-[-6deg]" />
            <p className="font-hand text-2xl">Plan #1</p>
            <h3 className="mt-1 text-3xl">The Test Drive</h3>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-5xl font-black">₹0</span>
              <span className="text-muted-foreground">/ first day</span>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "Full access for 1 whole day (6 AM – 12 AM)",
                "Experience the actual pin-drop silence",
                "Test the blazing-fast Wi-Fi (no cap)",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[2px] border-ink bg-lavender">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <a href="tel:08262900150" className="btn-brutal mt-8 w-full !bg-cream">Claim Free Trial</a>
          </div>

          {/* Rotational */}
          <div className="card-brutal relative rotate-1 !bg-mint/60 p-7">
            <span className="tape-strip left-8 top-[-14px] rotate-[5deg]" />
            <p className="font-hand text-2xl">Plan #2</p>
            <h3 className="mt-1 text-3xl">The Rotational Plan</h3>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-5xl font-black">₹450</span>
              <span className="text-ink/70">/ month</span>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "Full month of access (6 AM – 12 AM)",
                "Unlimited high-speed Wi-Fi",
                "Grab any open seat for the day",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[2px] border-ink bg-butter">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <a href="tel:08262900150" className="btn-brutal mt-8 w-full !bg-cream">Grab This Plan</a>
          </div>

          {/* Permanent Spot */}
          <div className="card-brutal relative -rotate-1 border-[4px] !bg-ink p-7 text-cream shadow-brutal-lg">
            <span className="absolute -top-4 right-5 -rotate-6 rounded-full border-[2.5px] border-ink bg-tangerine px-4 py-1 font-display text-sm text-ink shadow-brutal-sm">
              MOST POPULAR
            </span>
            <span className="tape-strip left-8 top-[-14px] rotate-[4deg]" />
            <p className="font-hand text-2xl text-butter">Plan #3</p>
            <h3 className="mt-1 text-3xl">Your Permanent Spot</h3>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-5xl font-black">₹600</span>
              <span className="text-cream/70">/ month</span>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "Dedicated permanent seat just for you",
                "Full month of unlimited access",
                "Unlimited high-speed Wi-Fi",
                "Pin-drop silence environment",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[2px] border-cream bg-tangerine">
                    <Check className="h-3.5 w-3.5 text-ink" />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <a href="tel:08262900150" className="btn-brutal mt-8 w-full !bg-tangerine !text-ink">
              Lock In My Seat <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* VS callout */}
        <div className="relative mt-16">
          <div className="relative grid md:grid-cols-2">
            {/* Dividers */}
            <div className="absolute inset-y-0 left-1/2 hidden w-[2px] -translate-x-1/2 bg-ink md:block" />
            <div className="absolute right-0 left-0 top-1/2 h-[2px] -translate-y-1/2 bg-ink md:hidden" />

            {/* VS badge */}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[2.5px] border-ink bg-lavender font-display text-xl shadow-brutal-sm">
              VS
            </div>

            {/* Rotational */}
            <div className="px-6 py-10 md:px-10 md:pr-16">
              <h4 className="text-3xl md:text-4xl">Rotational Plan</h4>
              <p className="mt-1 font-hand text-2xl text-tangerine">₹450 / month</p>
              <ul className="mt-6 space-y-4">
                {[
                  { emoji: "🪑", text: "Grab whatever seat is open" },
                  { emoji: "🎒", text: "Pack up your stuff every day" },
                  { emoji: "🏃‍♂️", text: "Gotta hunt for a spot during exams" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3 text-lg">
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Permanent */}
            <div className="px-6 py-10 md:px-10 md:pl-16">
              <div className="relative inline-block">
                <h4 className="relative z-10 text-3xl md:text-4xl">Permanent Plan</h4>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 -rotate-1 bg-tangerine/70" />
              </div>
              <p className="mt-1 font-hand text-2xl text-tangerine">₹600 / month</p>
              <ul className="mt-6 space-y-4">
                {[
                  { emoji: "👑", text: "Your own dedicated desk" },
                  { emoji: "📚", text: "Leave your books & setup safely overnight" },
                  { emoji: "🧘‍♂️", text: "Zero stress, just walk in and focus" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3 text-lg">
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-hand text-2xl text-tangerine">
                Worth it, honestly ↗
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* REVIEWS */}
      <section id="reviews" className="relative mx-auto max-w-7xl px-5 py-24">
        <div className="mb-14 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-hand text-2xl text-tangerine">— word on the street —</p>
            <h2 className="mt-2 text-5xl md:text-6xl">Students said<br/>it, not us.</h2>
          </div>
          <div className="card-brutal -rotate-2 bg-butter p-5">
            <div className="flex items-center gap-3">
              <span className="font-display text-5xl">4.8</span>
              <div>
                <div className="font-hand text-2xl text-tangerine">★★★★★</div>
                <p className="text-sm">Based on 10 Google reviews</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Aarya", tag: "MPSC aspirant", body: "The place full of silence and ambience is best. Finally getting stuff done.", bg: "bg-lavender", rot: "rotate-[-1.5deg]" },
            { name: "Rohan", tag: "Engineering", body: "Nice environment and nice interiors. Doesn't feel like a study room, feels like a spot.", bg: "bg-mint", rot: "rotate-[1deg]" },
            { name: "Sneha", tag: "UPSC", body: "The sitting arrangements are really nice. My back has stopped filing complaints.", bg: "bg-butter", rot: "rotate-[-0.5deg]" },
          ].map((r) => (
            <div key={r.name} className={`card-brutal ${r.bg} ${r.rot} relative p-6`}>
              <div className="absolute -top-3 left-6 h-6 w-6 rotate-45 border-b-[2.5px] border-l-[2.5px] border-ink" />
              <div className="mb-2 font-hand text-xl text-tangerine">★★★★★</div>
              <p className="text-lg leading-snug">"{r.body}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-ink bg-cream font-display">
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-bold">{r.name}</p>
                  <p className="text-sm text-ink/70">{r.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FIND US */}
      <section id="find" className="relative mx-auto max-w-7xl px-5 py-24">
        <div className="mb-14">
          <p className="font-hand text-2xl text-tangerine">— find us —</p>
          <h2 className="mt-2 text-5xl md:text-6xl">Come say hi.</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="card-brutal -rotate-1 space-y-6 bg-lavender p-8 lg:col-span-2">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 font-display text-sm">
                <MapPin className="h-4 w-4" /> THE SPOT
              </div>
              <p className="text-lg leading-snug">
                Address :- D MART - Tarabai garden road near opposite Hotel Maratha Regency, Mauli Apartment
              </p>
            </div>
            <div>
              <div className="mb-2 inline-flex items-center gap-2 font-display text-sm">
                <Clock className="h-4 w-4" /> HOURS
              </div>
              <p className="text-lg">6:00 AM — 12:00 AM, every day.</p>
              <span className="mt-3 inline-block -rotate-2 rounded-full border-[2.5px] border-ink bg-tangerine px-3 py-1 font-hand text-lg">
                🦉 Early birds & night owls welcome
              </span>
            </div>
            <div>
              <div className="mb-2 inline-flex items-center gap-2 font-display text-sm">
                <Phone className="h-4 w-4" /> RING US
              </div>
              <a href="tel:08262900150" className="text-2xl font-black hover:text-tangerine">
                082629 00150
              </a>
            </div>
            <div className="flex flex-wrap gap-2 pt-2 text-sm">
              <span className="rounded-full border-[2px] border-ink bg-cream px-3 py-1"><Wifi className="mr-1 inline h-3 w-3" />Fast Wi-Fi</span>
              <span className="rounded-full border-[2px] border-ink bg-cream px-3 py-1"><Volume2 className="mr-1 inline h-3 w-3" />Silent zone</span>
              <span className="rounded-full border-[2px] border-ink bg-cream px-3 py-1"><Star className="mr-1 inline h-3 w-3" />4.8 rated</span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="card-brutal rotate-1 overflow-hidden p-2">
              <iframe
                title="EduVision Study Room map"
                src="https://www.google.com/maps?q=EduVision+Study+Room,+Mauli+building+basement,+Maratha+Regency,+284,+near+Tarabai+Park+Road,+opp.+Hotel,+New+Shahupuri,+Kolhapur,+Maharashtra+416001&output=embed"
                className="h-[420px] w-full rounded-md border-[2px] border-ink"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="relative mx-auto max-w-7xl px-5 pb-20">
        <div className="card-brutal relative overflow-hidden bg-tangerine p-10 md:p-14">
          <div className="blob right-[-60px] top-[-40px] h-40 w-40 bg-butter/70" />
          <h3 className="max-w-2xl text-4xl md:text-5xl">Okay okay. Enough scrolling.<br/>Come try it. First day's on us.</h3>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="tel:08262900150" className="btn-brutal !bg-ink !text-cream">
              <Phone className="h-4 w-4" /> Call 082629 00150
            </a>
            <a href="#damage" className="btn-brutal !bg-cream">See The Plans</a>
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="chat" className="relative mx-auto max-w-4xl px-5 pb-24">
        <div className="card-brutal relative -rotate-1 overflow-hidden bg-butter p-8 md:p-12">
          <div className="blob left-[-50px] bottom-[-40px] h-40 w-40 bg-lavender/70" />
          <span className="tape-strip left-1/2 top-[-14px] -ml-11 rotate-[3deg]" />
          <div className="relative">
            <p className="font-hand text-2xl text-tangerine">— low pressure, zero spam —</p>
            <h2 className="mt-2 text-4xl md:text-5xl">Have Questions or Want a Quick Tour? 💬</h2>
            <p className="mt-4 max-w-xl text-lg">
              Wondering about timings, desk availability, or just want to pop in and check the vibe?
              Drop your details below—the owner will text or call you directly with quick answers!
            </p>
            <LeadForm />
          </div>
        </div>
      </section>


      {/* FOOTER */}


      <footer className="border-t-[2.5px] border-ink bg-ink px-5 py-10 text-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="font-display text-2xl">EDUVISION STUDY ROOM</p>
            <p className="text-cream/70">Kolhapur's quietest little corner. © {new Date().getFullYear()}</p>
          </div>
          <p className="font-hand text-2xl text-butter">now go study, champ 📚</p>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full border-[2.5px] border-cream bg-tangerine text-ink shadow-brutal"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={lightbox}
            alt="Study room photo"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] rounded-lg border-[3px] border-cream object-contain shadow-brutal-lg"
          />
        </div>
      )}

      </main>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>


  );
}

function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      className="mt-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="font-hand text-xl">Your Name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul from Shahupuri"
            className="mt-1 w-full rounded-xl border-[2.5px] border-ink bg-card px-4 py-3 shadow-brutal-sm outline-none focus:-translate-y-0.5 focus:shadow-brutal"
          />
        </label>
        <label className="block">
          <span className="font-hand text-xl">Phone / WhatsApp Number</span>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10 digits, no hassle"
            className="mt-1 w-full rounded-xl border-[2.5px] border-ink bg-card px-4 py-3 shadow-brutal-sm outline-none focus:-translate-y-0.5 focus:shadow-brutal"
          />
        </label>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-brutal !bg-tangerine !text-cream text-base">
          Get Quick Answers ⚡
        </button>
        {sent && (
          <span className="font-hand text-2xl text-ink">
            Thanks! The owner will drop you a message on WhatsApp shortly. See you soon! ☕
          </span>
        )}
      </div>
    </form>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!sent) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [sent, onClose]);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card-brutal relative w-full max-w-lg -rotate-1 !bg-butter p-7 md:p-9 shadow-brutal-lg"
      >
        <span className="tape-strip left-1/2 top-[-14px] -ml-11 rotate-[4deg]" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -right-3 -top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-ink bg-tangerine text-cream shadow-brutal-sm transition-transform hover:rotate-12"
        >
          <X className="h-5 w-5" />
        </button>

        {sent ? (
          <div className="py-8 text-center">
            <p className="font-hand text-3xl text-tangerine">woohoo!</p>
            <h3 className="mt-3 text-3xl">Thanks! The owner will drop you a message on WhatsApp shortly. See you soon! ☕</h3>
          </div>
        ) : (
          <>
            <h3 className="text-3xl md:text-4xl">Have Questions or Want a Quick Tour? 💬</h3>
            <p className="mt-3 text-base leading-snug">
              Wondering about timings, desk availability, or just want to pop in and check the vibe?
              Drop your details below—the owner will text or call you directly with quick answers!
            </p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="block">
                <span className="font-hand text-xl">Your Name</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul from Shahupuri"
                  className="mt-1 w-full rounded-xl border-[2.5px] border-ink bg-card px-4 py-3 shadow-brutal-sm outline-none focus:-translate-y-0.5 focus:shadow-brutal"
                />
              </label>
              <label className="block">
                <span className="font-hand text-xl">Phone / WhatsApp Number</span>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10 digits, no hassle"
                  className="mt-1 w-full rounded-xl border-[2.5px] border-ink bg-card px-4 py-3 shadow-brutal-sm outline-none focus:-translate-y-0.5 focus:shadow-brutal"
                />
              </label>
              <button type="submit" className="btn-sticker w-full text-base">
                Get Quick Answers ⚡
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
