import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { ArrowDown, ArrowRight, Calendar } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { WorldHandle } from "@/lib/experience/world";

const CALENDLY = "https://calendly.com/yber2001/30min";

/**
 * The journey's acts. Each act is a full-viewport DOM section layered over
 * the 3D world; the canvas camera travels between scenes as these scroll by.
 */
const ACTS = [
  {
    kicker: "Act I — Arrival",
    title: "Your numbers, in a new light.",
    body: "Most businesses live in financial fog — receipts, spreadsheets, guesswork. Scroll, and watch what a real accounting partner does with the chaos.",
  },
  {
    kicker: "Act II — Order",
    title: "From shoebox to skyline.",
    body: "Bookkeeping isn't data entry. It's turning thousands of scattered transactions into a structure you can actually stand on — clean books, every month, without you touching a spreadsheet.",
  },
  {
    kicker: "Act III — Ascent",
    title: "Tax strategy is a climb, not a scramble.",
    body: "S-Corp elections, quarterly estimates, entity structure, deductions you didn't know existed. We plan the route in January so April is just another month.",
  },
  {
    kicker: "Act IV — Intelligence",
    title: "An AI-native firm, not a filing cabinet.",
    body: "Custom AI agents, automated workflows, and calculators built on your real numbers. The same systems we build for our own practice, working for yours.",
  },
  {
    kicker: "Act V — Trust",
    title: "Steady hands behind the glass.",
    body: "Licensed CPA & FCCA. Real humans who answer the phone, explain the why, and sign their work. Technology amplifies judgment — it never replaces it.",
  },
] as const;

const STATS = [
  { value: 15, suffix: "+", label: "Years of practice" },
  { value: 6, suffix: "", label: "Industries served" },
  { value: 100, suffix: "%", label: "Licensed CPA-signed work" },
] as const;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Count-up stat that starts when it scrolls into view. */
function Stat({ value, suffix, label, animate }: { value: number; suffix: string; label: string; animate: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(animate ? 0 : value);

  useEffect(() => {
    if (!animate) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1400, 1);
          setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, animate]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white tabular-nums">
        {display}
        <span className="text-emerald-400">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-slate-400 tracking-wide">{label}</div>
    </div>
  );
}

export default function Experience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [webglFailed, setWebglFailed] = useState(false);

  // ------------------------------------------------------------- 3D world
  useEffect(() => {
    const canvas = canvasRef.current;
    const journey = journeyRef.current;
    if (!canvas || !journey) return;

    let world: WorldHandle | null = null;
    let cancelled = false;
    let pageVisible = !document.hidden;
    let canvasVisible = true;
    const cleanups: Array<() => void> = [];

    // Cinematic load: the world builds procedurally (fast), so the loader is
    // a short, deliberate beat — long enough to set the mood, never a wait.
    let raf = 0;
    const loadStart = performance.now();
    const loader = (now: number) => {
      const t = Math.min((now - loadStart) / 1500, 1);
      setLoadProgress(Math.round(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(loader);
      } else {
        setLoaded(true);
      }
    };
    raf = requestAnimationFrame(loader);
    cleanups.push(() => cancelAnimationFrame(raf));

    import("@/lib/experience/world")
      .then(({ createWorld }) => {
        if (cancelled) return;
        try {
          world = createWorld(canvas);
        } catch {
          setWebglFailed(true);
          return;
        }

        const syncRunning = () => world?.setRunning(!reducedMotion && pageVisible && canvasVisible);

        const onScroll = () => {
          const rect = journey.getBoundingClientRect();
          const total = rect.height - window.innerHeight;
          const progress = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
          setScrollPct(progress);
          world?.setScroll(progress);
          if (reducedMotion) world?.renderOnce();
        };
        const onPointerMove = (e: PointerEvent) => {
          world?.setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
        };
        const onResize = () => {
          world?.resize();
          if (reducedMotion) world?.renderOnce();
        };
        const onVisibility = () => {
          pageVisible = !document.hidden;
          syncRunning();
        };
        const io = new IntersectionObserver(([entry]) => {
          canvasVisible = entry.isIntersecting;
          syncRunning();
        });
        io.observe(canvas);

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("resize", onResize);
        document.addEventListener("visibilitychange", onVisibility);
        cleanups.push(() => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("resize", onResize);
          document.removeEventListener("visibilitychange", onVisibility);
          io.disconnect();
        });

        onScroll();
        if (reducedMotion) {
          world.renderOnce();
        } else {
          syncRunning();
        }
      })
      .catch(() => setWebglFailed(true));

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      world?.dispose();
    };
  }, [reducedMotion]);

  // ----------------------------------------------------- section reveals
  useEffect(() => {
    if (!loaded) return;
    const sections = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reducedMotion) {
      sections.forEach((s) => s.classList.add("xp-revealed"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          entry.target.classList.toggle("xp-revealed", entry.isIntersecting);
        }),
      { threshold: 0.35 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [loaded, reducedMotion]);

  // --------------------------------------------------------- custom cursor
  useEffect(() => {
    if (reducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let raf = 0;
    let x = -100;
    let y = -100;
    let ringX = -100;
    let ringY = -100;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onOverInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      ring.classList.toggle("xp-cursor-active", !!target.closest("a, button"));
    };
    const tick = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(tick);
    };

    document.body.classList.add("xp-hide-cursor");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOverInteractive, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      document.body.classList.remove("xp-hide-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOverInteractive);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <>
      <Helmet>
        <title>The Selam CPA Experience — A Cinematic Journey Through Modern Accounting</title>
        <meta
          name="description"
          content="Scroll through an immersive 3D journey: from financial chaos to clean books, strategic tax planning, and AI-powered accounting. See how Selam CPA works — then book a call."
        />
        <link rel="canonical" href="https://selamcpa.com/experience" />
      </Helmet>

      <style>{`
        .xp-hide-cursor, .xp-hide-cursor a, .xp-hide-cursor button { cursor: none; }
        .xp-cursor-dot {
          position: fixed; top: -4px; left: -4px; width: 8px; height: 8px; border-radius: 9999px;
          background: #34d399; pointer-events: none; z-index: 100;
        }
        .xp-cursor-ring {
          position: fixed; top: -20px; left: -20px; width: 40px; height: 40px; border-radius: 9999px;
          border: 1.5px solid rgba(52, 211, 153, 0.5); pointer-events: none; z-index: 100;
          transition: width 0.25s, height 0.25s, top 0.25s, left 0.25s, border-color 0.25s;
        }
        .xp-cursor-ring.xp-cursor-active {
          width: 64px; height: 64px; top: -32px; left: -32px;
          border-color: rgba(52, 211, 153, 0.9);
        }
        [data-reveal] { opacity: 0; transform: translateY(36px); transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1); }
        [data-reveal].xp-revealed { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1; transform: none; transition: none; }
        }
        @keyframes xp-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        .xp-scroll-hint { animation: xp-bounce 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .xp-scroll-hint { animation: none; } }
        @keyframes xp-fade-out { to { opacity: 0; visibility: hidden; } }
        .xp-loader-done { animation: xp-fade-out 0.8s ease 0.2s forwards; }
      `}</style>

      {/* Cinematic loading sequence */}
      <div
        className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#0a0f1e] ${loaded ? "xp-loader-done" : ""}`}
        aria-hidden={loaded}
      >
        <div className="text-white text-2xl font-bold tracking-tight mb-8">Selam CPA</div>
        <div className="w-56 h-px bg-white/10 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-emerald-400 transition-[width] duration-150 ease-out"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
        <div className="mt-4 text-xs text-slate-500 tracking-[0.3em] uppercase tabular-nums">
          {loadProgress < 100 ? `Building your world — ${loadProgress}%` : "Ready"}
        </div>
      </div>

      {/* Custom cursor (desktop, motion-safe only) */}
      {!reducedMotion && (
        <>
          <div ref={cursorDotRef} className="xp-cursor-dot hidden lg:block" aria-hidden="true" />
          <div ref={cursorRingRef} className="xp-cursor-ring hidden lg:block" aria-hidden="true" />
        </>
      )}

      {/* Journey progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent" aria-hidden="true">
        <div className="h-full bg-emerald-400/90" style={{ width: `${scrollPct * 100}%` }} />
      </div>

      <Header />

      <main id="main-content" className="bg-[#0a0f1e]">
        <div ref={journeyRef} className="relative">
          {/* The 3D world — fixed behind the scrolling acts */}
          {!webglFailed ? (
            <canvas
              ref={canvasRef}
              className="fixed inset-0 w-full h-full"
              style={{ width: "100%", height: "100%" }}
              aria-hidden="true"
            />
          ) : (
            <div
              className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,#12233b_0%,#0a0f1e_70%)]"
              aria-hidden="true"
            />
          )}

          {/* Act 0 — hero / invitation to scroll */}
          <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <div data-reveal>
              <p className="text-emerald-400 text-sm font-medium tracking-[0.35em] uppercase mb-6">
                An interactive journey
              </p>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight max-w-4xl leading-[1.05]">
                Accounting, as an
                <span className="text-emerald-400"> experience</span>.
              </h1>
              <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto">
                Five acts. One scroll. The story of what happens when a modern CPA firm takes over your numbers.
              </p>
            </div>
            <div className="absolute bottom-10 flex flex-col items-center gap-2 text-slate-500 text-xs tracking-[0.3em] uppercase">
              Scroll to begin
              <ArrowDown className="w-4 h-4 xp-scroll-hint" aria-hidden="true" />
            </div>
          </section>

          {/* Acts I–V */}
          {ACTS.map((act, i) => (
            <section key={act.kicker} className="relative min-h-[140vh] flex items-center px-6">
              <div
                data-reveal
                className={`max-w-lg ${i % 2 === 0 ? "mr-auto ml-0 md:ml-[8vw]" : "ml-auto mr-0 md:mr-[8vw]"}`}
              >
                <div className="rounded-2xl border border-white/10 bg-[#0a0f1e]/55 backdrop-blur-md p-8 md:p-10">
                  <p className="text-emerald-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">{act.kicker}</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">{act.title}</h2>
                  <p className="mt-4 text-slate-300 leading-relaxed">{act.body}</p>
                  {act.kicker.includes("Trust") && (
                    <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                      {STATS.map((s) => (
                        <Stat key={s.label} {...s} animate={!reducedMotion} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}

          {/* Finale — the invitation */}
          <section className="relative min-h-screen flex items-center justify-center px-6 text-center">
            <div data-reveal className="max-w-2xl">
              <p className="text-emerald-400 text-sm font-medium tracking-[0.35em] uppercase mb-6">The invitation</p>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                Your story is next.
              </h2>
              <p className="mt-6 text-lg text-slate-400">
                Thirty minutes, no pitch deck, no obligation. Bring the chaos — we'll show you the skyline.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 text-base font-semibold rounded-xl transition-all hover:scale-[1.03] active:scale-[0.98]"
                  data-testid="experience-book-call"
                >
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  Book a Discovery Call
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-emerald-400/60 text-white px-8 py-4 text-base font-semibold rounded-xl transition-all hover:bg-white/5"
                  data-testid="experience-contact"
                >
                  Send a Message
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Solid backdrop resumes so the footer isn't over the canvas */}
        <div className="relative bg-[#0a0f1e]">
          <Footer />
        </div>
      </main>
    </>
  );
}
