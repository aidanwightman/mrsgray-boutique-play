import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import HeroNav from "@/components/HeroNav";
import PlayerCard from "@/components/PlayerCard";
import { Mail, Instagram, Linkedin, Twitter } from "lucide-react";
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

const services = [
  "Contract negotiations",
  "Career development — On and off the pitch",
  "Club transfers",
  "Loans",
  "Commercial partnerships",
  "Off pitch marketing and campaigns",
];

// --- Intro Animation ---
const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("mrsgray-intro-shown");
    if (hasSeenIntro) { onComplete(); return; }

    const t1 = setTimeout(() => setShowLogo(true), 200);
    const t2 = setTimeout(() => setShowText(true), 1200);
    const t3 = setTimeout(() => {
      sessionStorage.setItem("mrsgray-intro-shown", "true");
      onComplete();
    }, 2800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  if (sessionStorage.getItem("mrsgray-intro-shown")) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
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
    </AnimatePresence>
  );
};

// --- Sequential line-by-line typewriter ---
const HERO_LINES = [
  "We are a boutique women's football agency",
  "that does things differently.",
  "With a clear, considered approach,",
  "we support athletes beyond representation",
  "by guiding their development, protecting their journey,",
  "and helping them grow with confidence.",
];

const SPEED = 28;   // ms per character
const PAUSE = 180;  // ms gap between lines
const INIT  = 500;  // ms before first line starts

// Pre-calculate when each line starts typing
const LINE_DELAYS = HERO_LINES.reduce<number[]>((acc, line, i) => {
  if (i === 0) return [INIT];
  return [...acc, acc[i - 1] + HERO_LINES[i - 1].length * SPEED + PAUSE];
}, []);

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
        <div key={i}>
          {activeIndex >= i ? (
            <TextType
              as="span"
              text={line}
              typingSpeed={SPEED}
              initialDelay={0}
              loop={false}
              showCursor={activeIndex === i}
              startOnVisible={false}
              className="font-condensed text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl leading-snug text-foreground/85 font-light"
              cursorCharacter="|"
              cursorClassName="text-[#c4a470]"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

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
  const [introComplete, setIntroComplete] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!introComplete) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const sections = ["home", "players", "about", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [introComplete]);

  return (
    <>
      <IntroAnimation onComplete={() => setIntroComplete(true)} />

      {introComplete && (
        <>
          {/* Header */}
          <header
            className={`fixed top-0 left-0 right-0 z-[60] pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ${
              isScrolled
                ? 'bg-background/95 backdrop-blur-md border-b border-white/10 py-2 md:py-3 shadow-md'
                : 'bg-transparent py-4 md:py-5'
            }`}
          >
            <div className="flex justify-between items-center max-w-[1440px] mx-auto w-full px-4 min-[480px]:px-6 md:px-12">
              <HeroNav activeSection={activeSection} />
              <div className="shrink-0 pl-2">
                <p className="font-condensed text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                  Women's Football Agency
                </p>
              </div>
            </div>
          </header>

          <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">

            {/* Hidden SEO Content */}
            <div className="sr-only" aria-hidden="true">
              <h1>Mrs Gray - London Women's Football Agency</h1>
              <p>Mrs Gray is the premier women's football agency in London, offering elite player representation and football management.</p>
            </div>

            <main className="relative z-10">

              {/* ── HERO SECTION ── */}
              <section id="home" className="relative scroll-mt-24 min-h-dvh flex flex-col px-4 min-[480px]:px-6 md:px-12 pt-4 md:pt-6 pb-0 bg-background">
                <div className="h-14 sm:h-16 md:h-20" />

                <div className="flex-1 flex flex-col justify-between animate-fade-in">
                  {/* Warm glow behind logo */}
                  <div className="relative flex justify-center pt-2 md:pt-4 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(196,164,112,0.12)_0%,transparent_70%)] blur-2xl" />
                    </div>
                    <img
                      src={mrsGrayScript}
                      alt="Mrs Gray"
                      className="relative w-full max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[28vh] md:max-h-[32vh] object-contain select-none pointer-events-none opacity-90"
                    />
                  </div>

                  {/* Agency description - line-by-line typewriter */}
                  <div className="flex flex-col gap-5 md:gap-6 py-8 md:py-12 px-2 min-[480px]:px-4 md:px-8 max-w-3xl">
                    <HeroText />
                    {/* Accent tagline — warm gold colour */}
                    <p className="font-condensed text-base sm:text-lg md:text-xl tracking-[0.08em] font-semibold uppercase"
                      style={{ color: '#c4a470' }}>
                      Long term growth over quick wins.
                    </p>
                  </div>
                </div>

                {/* Bottom bar — social links */}
                <div className="flex items-end justify-between px-2 min-[480px]:px-4 md:px-8 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:pb-6 animate-fade-in border-t border-border/40" style={{ animationDelay: "0.6s" }}>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-8">
                    {[
                      { label: "Instagram", href: "https://www.instagram.com/mrsgrayagency/" },
                      { label: "LinkedIn", href: "https://www.linkedin.com/company/mrs-gray-sports-agency/" },
                      { label: "Twitter", href: "https://x.com/mrsgrayagency" }
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-condensed text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── PLAYERS SECTION ── */}
              <section id="players" className="relative scroll-mt-24 py-16 sm:py-20 md:py-28 px-4 min-[480px]:px-6 md:px-24 bg-secondary/40 border-t border-white/10">
                <GradualBlur position="top" height="5rem" strength={2} divCount={6} curve="ease-out" />
                <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
                  <FadeUp>
                    <div className="space-y-4">
                      <h2 className="font-condensed text-4xl md:text-5xl font-semibold tracking-wide text-foreground uppercase">Our Players</h2>
                      <div className="h-px w-24" style={{ background: 'linear-gradient(to right, #c4a470, transparent)' }} />
                    </div>
                  </FadeUp>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-2 min-[480px]:px-4 md:px-0">
                    {players.map((player, index) => (
                      <FadeUp key={player.name} delay={index * 0.08}>
                        <PlayerCard name={player.name} club={player.club} image={player.image} />
                      </FadeUp>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── ABOUT SECTION — white splash ── */}
              <section id="about" className="relative scroll-mt-24 py-16 sm:py-20 md:py-28 px-4 min-[480px]:px-6 md:px-24 bg-white text-[#1a1816]">
                <GradualBlur position="top" height="4rem" strength={1.5} divCount={5} curve="ease-out" />
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
                  <FadeUp>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h2 className="font-condensed text-4xl md:text-5xl font-semibold tracking-wide text-[#1a1816] uppercase">Who We Are</h2>
                      <div className="h-px w-24" style={{ background: 'linear-gradient(to right, #c4a470, transparent)' }} />
                    </div>
                    <div className="font-body text-base md:text-lg leading-relaxed text-[#1a1816]/65 space-y-6">
                      <p>
                        Mrs Gray is a female-focused, boutique football agency redefining the landscape of women's football.
                        Founded by former professional Michaela Gooden, the agency blends real experience with purpose,
                        representing a carefully selected group of athletes.
                      </p>
                      <p>
                        As a boutique agency, we thrive on intention, prioritising time, trust, and tailored support.
                        We celebrate the woman behind the athlete, empowering each client to grow with confidence,
                        express their individuality, and leave a legacy both on and off the pitch.
                      </p>
                    </div>
                  </div>
                  </FadeUp>

                  {/* Services Box */}
                  <FadeUp delay={0.15}>
                  <div className="bg-[#f5f3f0] p-8 md:p-10 space-y-6 border border-[#1a1816]/10">
                    <h3 className="font-condensed text-2xl md:text-3xl font-semibold tracking-wide uppercase text-[#1a1816]">Services</h3>
                    <ul className="space-y-3">
                      {services.map((service, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-[#1a1816]/40" />
                          <span className="font-condensed text-sm md:text-base tracking-wide text-[#1a1816]/65">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  </FadeUp>
                </div>

                {/* Founder Section */}
                <FadeUp delay={0.1}>
                <div className="max-w-5xl mx-auto mt-16 md:mt-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                  {/* Photo — smaller */}
                  <div className="mx-auto w-full max-w-[280px] md:max-w-[320px] aspect-[3/4] bg-[#e8e6e2] relative overflow-hidden group cursor-default border border-[#1a1816]/10">
                    <img
                      src="/michaela.jpg"
                      alt="Michaela Gooden"
                      className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1816]/15 to-transparent pointer-events-none" />
                  </div>
                  <div className="space-y-5">
                    <h3 className="font-condensed text-3xl md:text-4xl font-semibold tracking-wide uppercase text-[#1a1816]">Michaela Gooden</h3>
                    <p className="font-condensed text-xs md:text-sm tracking-[0.25em] uppercase text-[#1a1816]/50">Lead Intermediary & Founder</p>
                    <div className="space-y-4 font-body text-base md:text-lg leading-relaxed text-[#1a1816]/65">
                      <p>
                        Michaela is a former professional footballer who transitioned to representation after a career
                        that spanned youth and senior clubs across England and a scholarship in the US.
                      </p>
                      <p>
                        Her unique blend of on-field experience and creative industry expertise makes her especially
                        equipped to represent women who want to craft a lasting and authentic career.
                      </p>
                    </div>
                  </div>
                </div>
                </FadeUp>
              </section>

              {/* ── CONTACT SECTION ── back to dark */}
              <section id="contact" className="scroll-mt-24 py-16 sm:py-20 md:py-28 px-4 min-[480px]:px-6 md:px-24 bg-background border-t border-white/10">
                <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
                  <FadeUp>
                  <div className="space-y-4">
                    <h2 className="font-condensed text-4xl md:text-5xl font-semibold tracking-wide uppercase text-foreground">Inquire</h2>
                    <div className="h-px w-24 mx-auto" style={{ background: 'linear-gradient(to right, transparent, #c4a470, transparent)' }} />
                  </div>
                  </FadeUp>
                  <p className="font-body text-lg sm:text-xl md:text-2xl text-foreground/60 leading-relaxed max-w-2xl mx-auto">
                    For representation or partnership inquiries, please reach out to our team.
                  </p>
                  <a
                    href="mailto:info@mrsgray.agency"
                    className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base sm:text-lg md:text-xl font-condensed tracking-wider text-foreground hover:opacity-70 transition-opacity"
                  >
                    <Mail className="w-5 h-5 shrink-0" />
                    <span>info@mrsgray.agency</span>
                  </a>
                  <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 pt-6 md:pt-10">
                    {[
                      { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mrsgrayagency/" },
                      { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/mrs-gray-sports-agency/" },
                      { icon: Twitter, label: "Twitter", href: "https://x.com/mrsgrayagency" }
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 group min-w-[4.5rem] touch-manipulation"
                      >
                        <social.icon className="w-5 h-5 text-foreground/50 group-hover:text-foreground transition-colors" />
                        <span className="font-condensed text-[10px] tracking-[0.2em] uppercase text-foreground/40 group-hover:text-foreground/80">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            </main>

            <footer className="py-8 px-4 border-t border-border/50 text-center bg-background">
              <p className="font-condensed text-[10px] md:text-xs tracking-[0.25em] text-muted-foreground uppercase">
                © 2026 Mrs Gray Agency. All rights reserved.
              </p>
            </footer>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
