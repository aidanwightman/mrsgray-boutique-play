import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import HeroNav from "@/components/HeroNav";
import PlayerCard from "@/components/PlayerCard";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import mrsGrayScript from "@/assets/script-font-bg.png";
import GradualBlur from "@/components/GradualBlur";
import TextType from "@/components/TextType";

const players = [
  {
    name: "Drew Spence",
    club: "Tottenham Hotspur",
    image: "/players/drew-spence.jpg"
  },
  {
    name: "Emily Syme",
    club: "Bristol City",
    image: "/players/emily-syme.jpg"
  },
  {
    name: "Tegan McGowan",
    club: "Charlton Athletic",
    image: "/players/tegan-mcgowan.jpg"
  },
  {
    name: "Megan Walsh",
    club: "West Ham United",
    image: "/players/megan-walsh.jpg"
  },
  {
    name: "Clara Bellahall",
    club: "Cheltenham Town / Jamaica",
    image: "/players/clara-bellahall.jpg"
  }
];

// --- Intro Animation ---
const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setShowLogo(true), 200);
    const t2 = setTimeout(() => setShowText(true), 1200);
    // Begin fading the overlay out at 2400ms
    const t3 = setTimeout(() => setVisible(false), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    // onExitComplete fires after the fade-out animation fully finishes
    <AnimatePresence onExitComplete={() => {
      sessionStorage.setItem("mrsgray-intro-shown", "true");
      onComplete();
    }}>
      {visible && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'hsl(var(--background))' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={showLogo ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <img
              src={mrsGrayScript}
              alt="Mrs Gray"
              className="w-[280px] md:w-[420px] select-none pointer-events-none"
            />
            {showText && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-condensed text-[11px] tracking-[0.35em] uppercase text-muted-foreground"
              >
                Women's Football Agency
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Sequential typewriter ---
const HERO_LINES = [
  "We are a boutique women's football agency",
  "that does things differently.",
  "With a clear, considered approach,",
  "we support athletes beyond representation",
  "by guiding their development, protecting their journey,",
  "and helping them grow with confidence.",
];

const SPEED = 28;
const PAUSE = 180;
const INIT  = 500;

const LINE_DELAYS = HERO_LINES.reduce<number[]>((acc, line, i) => {
  if (i === 0) return [INIT];
  return [...acc, acc[i - 1] + HERO_LINES[i - 1].length * SPEED + PAUSE];
}, []);

const LINE_CLS = "font-condensed text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl leading-snug text-foreground/85 font-light";

const HeroText = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    HERO_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveIndex(i), LINE_DELAYS[i]));
    });
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref} className="space-y-[0.15em]">
      {HERO_LINES.map((line, i) => (
        // Invisible placeholder always holds the line height — no layout shift
        <div key={i} className="relative">
          <span className={`${LINE_CLS} invisible select-none`} aria-hidden="true">
            {line}
          </span>
          {activeIndex >= i && (
            <span className="absolute inset-0">
              <TextType
                as="span"
                text={line}
                typingSpeed={SPEED}
                initialDelay={0}
                loop={false}
                showCursor={activeIndex === i}
                startOnVisible={false}
                className={LINE_CLS}
                cursorCharacter="|"
                cursorClassName="text-[#c4a470]"
              />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

// --- Scrolling player strip ---
const PlayerScrollStrip = () => {
  const [paused, setPaused] = useState(false);
  // Duplicate so the marquee keyframe (-50%) creates a seamless loop
  const doubled = [...players, ...players];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex"
        style={{
          width: 'max-content',
          gap: '20px',
          animation: 'marquee 22s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {doubled.map((player, i) => (
          <div
            key={i}
            className="shrink-0 relative overflow-hidden group"
            style={{ width: '300px', aspectRatio: '3/4' }}
          >
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 45%, transparent 70%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-condensed text-white font-bold text-xl tracking-tight leading-none">{player.name}</p>
              <p className="font-condensed text-white/55 text-sm tracking-wide mt-1">{player.club}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Marquee ticker strip ---
const MARQUEE_PHRASE = "\u00a0\u00a0MRS GRAY\u00a0\u00a0·\u00a0\u00a0BOUTIQUE WOMEN'S FOOTBALL AGENCY\u00a0\u00a0·\u00a0\u00a0LONDON\u00a0\u00a0·";
const MARQUEE_ITEMS = Array(10).fill(MARQUEE_PHRASE).join('');

const MarqueeStrip = () => (
  <div
    className="relative overflow-hidden py-4 bg-[#050402]"
    aria-hidden="true"
  >
    <div
      className="flex whitespace-nowrap"
      style={{ animation: 'marquee 38s linear infinite' }}
    >
      <span className="font-condensed text-xl md:text-2xl tracking-[0.28em] uppercase text-[#c4a470]/80 shrink-0">
        {MARQUEE_ITEMS}
      </span>
      <span className="font-condensed text-xl md:text-2xl tracking-[0.28em] uppercase text-[#c4a470]/80 shrink-0">
        {MARQUEE_ITEMS}
      </span>
    </div>
  </div>
);

// --- Scroll reveal wrapper ---
const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

// --- Main Page ---
const Index = () => {
  // If the intro has already been seen this session, skip it entirely
  const skipIntro = !!sessionStorage.getItem("mrsgray-intro-shown");
  const [introComplete, setIntroComplete] = useState(skipIntro);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Always track scroll so header goes solid on scroll — independent of intro
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section tracking — only once page content is visible
  useEffect(() => {
    if (!introComplete) return;
    const onScroll = () => {
      const sections = ["home", "players", "about", "contact"];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [introComplete]);

  return (
    <>
      {!skipIntro && <IntroAnimation onComplete={() => setIntroComplete(true)} />}

      {/* Header — always rendered so nav is visible immediately */}
      <header
        className={`fixed top-0 left-0 right-0 pt-[env(safe-area-inset-top,0px)] transition-all duration-500 ${
          isScrolled ? 'py-2 md:py-3' : 'py-4 md:py-5'
        }`}
        style={{
          zIndex: 60,
          background: isScrolled ? '#1c1812' : '#141108',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.6)' : 'none',
        }}
      >
        <div className="relative flex justify-between items-center max-w-[1440px] mx-auto w-full px-4 min-[480px]:px-6 md:px-12">
          <HeroNav activeSection={activeSection} />
          <div className="flex items-center gap-5 shrink-0 pl-2">
            {[
              { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mrsgrayagency/" },
              { icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/company/mrs-gray-sports-agency/" },
              { icon: Twitter,   label: "Twitter",   href: "https://x.com/mrsgrayagency" },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="text-white/40 hover:text-white transition-colors duration-300">
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </header>

      {introComplete && (
        <motion.div
          initial={skipIntro ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">

            {/* Hidden SEO Content */}
            <div className="sr-only" aria-hidden="true">
              <h1>Mrs Gray - London Women's Football Agency</h1>
              <p>Mrs Gray is the premier women's football agency in London, offering elite player representation and football management.</p>
            </div>

            <main className="relative z-10">

              {/* ── HERO SECTION ── */}
              <section id="home" className="relative scroll-mt-24 flex flex-col px-4 min-[480px]:px-6 md:px-24 pt-4 md:pt-6 bg-background overflow-x-hidden" style={{ minHeight: '100dvh' }}>

                {/* Large atmospheric warm glow — centre of hero */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse 90% 70% at 55% 42%, rgba(196,164,112,0.11) 0%, rgba(160,120,60,0.05) 45%, transparent 72%)',
                  }}
                />

                <div className="h-14 sm:h-16 md:h-20" />

                <div className="flex-1 flex flex-col justify-between animate-fade-in">
                  {/* Logo */}
                  <div className="relative flex justify-center" style={{ paddingTop: '28vh', paddingBottom: '4vh' }}>

                  {/* Giant decorative background word — centred behind the logo */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
                  >
                    <span
                      className="font-condensed font-black uppercase leading-none text-white text-center w-full"
                      style={{
                        fontSize: 'clamp(3.5rem, 11vw, 10rem)',
                        opacity: 0.045,
                        letterSpacing: '0.04em',
                      }}
                    >
                      WOMEN'S FOOTBALL
                    </span>
                  </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-[85%] h-[85%] blur-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(196,164,112,0.22) 0%, rgba(180,140,80,0.08) 50%, transparent 75%)' }} />
                    </div>
                    <img
                      src={mrsGrayScript}
                      alt="Mrs Gray"
                      className="relative select-none pointer-events-none opacity-90"
                      style={{ height: '30vh', width: 'auto', maxWidth: '95%' }}
                    />
                  </div>

                  {/* Agency description — pinned to bottom of flex space */}
                  <div className="flex flex-col max-w-4xl" style={{ paddingBottom: '18vh' }}>
                    <HeroText />
                  </div>
                </div>

                {/* Bottom padding so text doesn't sit flush at the very bottom */}
                <div className="pb-[max(2rem,env(safe-area-inset-bottom,0px))]" />
              </section>

              {/* ── MARQUEE STRIP — equal space above and below ── */}
              <div className="py-14 md:py-20" style={{ background: '#050402' }}>
                <div className="w-full h-px" style={{ background: 'linear-gradient(to right, rgba(196,164,112,0.85) 0%, rgba(196,164,112,0.35) 50%, rgba(196,164,112,0.85) 100%)' }} />
                <MarqueeStrip />
                <div className="w-full h-px" style={{ background: 'linear-gradient(to right, rgba(196,164,112,0.85) 0%, rgba(196,164,112,0.35) 50%, rgba(196,164,112,0.85) 100%)' }} />
              </div>

              {/* ── PLAYERS SECTION ── */}
              <section id="players" className="relative scroll-mt-24 pt-14 sm:pt-16 md:pt-20 pb-20 sm:pb-24 md:pb-32 bg-[#050402] border-b border-white/[0.06] overflow-hidden">

                {/* Atmospheric glow */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0"
                  style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(196,164,112,0.06) 0%, transparent 70%)' }} />

                {/* Heading */}
                <div className="px-4 min-[480px]:px-6 md:px-24 mb-10 md:mb-14">
                  <FadeUp>
                    <h2 className="font-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground uppercase leading-none">Our Players</h2>
                  </FadeUp>
                </div>

                {/* Scroll strip — full bleed */}
                <FadeUp delay={0.1}>
                  <PlayerScrollStrip />
                </FadeUp>

              </section>

            </main>

            {/* ── AGENCY STATEMENT ── */}
            <section className="relative overflow-hidden px-4 min-[480px]:px-6 md:px-24 py-24 md:py-32"
              style={{ background: '#050402', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div aria-hidden="true" className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 60% 60% at 30% 50%, rgba(196,164,112,0.07) 0%, transparent 65%)' }} />
              <FadeUp>
                <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-start">
                  <div className="space-y-6">
                    <p className="font-condensed text-xs tracking-[0.3em] uppercase"
                      style={{ color: 'rgba(196,164,112,0.65)' }}>
                      Represented by Mrs Gray
                    </p>
                    <p className="font-condensed text-2xl sm:text-3xl md:text-4xl leading-snug text-foreground/85 font-light">
                      A carefully selected group of athletes who represent the future of women's football.
                    </p>
                  </div>
                  <div className="space-y-8">
                    <p className="font-body text-base md:text-lg leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Each player is chosen not just for their ability on the pitch, but for their character,
                      ambition, and the story they have to tell. We work with athletes at every stage of their
                      career — from emerging talent to established professionals.
                    </p>
                    <a href="/about"
                      className="inline-flex items-center gap-3 font-condensed text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:gap-4"
                      style={{ color: 'rgba(196,164,112,0.8)' }}>
                      Learn about the agency <span>→</span>
                    </a>
                  </div>
                </div>
              </FadeUp>
            </section>

            {/* ── INQUIRIES ── */}
            <section className="relative overflow-hidden flex flex-col items-center justify-center text-center"
              style={{ background: '#0a0805', borderTop: '1px solid rgba(255,255,255,0.06)', minHeight: '40vh', padding: '8vh 1rem' }}>
              <div aria-hidden="true" className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(196,164,112,0.09) 0%, transparent 70%)' }} />
              <FadeUp>
                <div className="relative flex flex-col items-center gap-8">
                  <p className="font-condensed text-xs tracking-[0.3em] uppercase"
                    style={{ color: 'rgba(196,164,112,0.6)' }}>
                    Work with us
                  </p>
                  <a href="/inquire"
                    className="inline-flex items-center gap-3 font-condensed text-sm tracking-[0.22em] uppercase transition-all duration-300 px-12 py-4 hover:gap-5"
                    style={{
                      background: 'linear-gradient(135deg, rgba(196,164,112,0.15), rgba(196,164,112,0.08))',
                      border: '1px solid rgba(196,164,112,0.4)',
                      color: '#c4a470',
                    }}>
                    Start an Inquiry
                  </a>
                </div>
              </FadeUp>
            </section>

            <footer className="py-6 px-4 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0a0805' }}>
              <p className="font-condensed text-[10px] md:text-xs tracking-[0.25em] text-muted-foreground uppercase">
                © 2026 Mrs Gray Agency. All rights reserved.
              </p>
            </footer>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Index;
