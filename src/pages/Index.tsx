import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroNav from "@/components/HeroNav";
import PlayerCard from "@/components/PlayerCard";
import { Mail, Instagram, Linkedin, Twitter } from "lucide-react";
import mrsGrayScript from "@/assets/script-font-bg.png";

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
                ? 'bg-white/95 backdrop-blur-md border-b border-border py-2 md:py-3 shadow-sm'
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
                  {/* Mrs Gray Script Logo */}
                  <div className="flex justify-center pt-2 md:pt-4 overflow-hidden">
                    <img
                      src={mrsGrayScript}
                      alt="Mrs Gray"
                      className="w-full max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[28vh] md:max-h-[32vh] object-contain select-none pointer-events-none opacity-90"
                    />
                  </div>

                  {/* Agency description - below logo */}
                  <div className="flex flex-col gap-6 md:gap-8 py-8 md:py-12 px-2 min-[480px]:px-4 md:px-8 max-w-3xl">
                    <p className="font-condensed text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl leading-snug text-foreground/85 font-light">
                      We are a boutique women's football agency that does things differently. With a clear, considered approach, we support athletes beyond representation by guiding their development, protecting their journey, and helping them grow with confidence.
                    </p>
                    <p className="font-condensed text-base sm:text-lg md:text-xl tracking-[0.04em] text-muted-foreground font-light">
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
              <section id="players" className="scroll-mt-24 py-16 sm:py-20 md:py-28 px-4 min-[480px]:px-6 md:px-24 bg-secondary/40 border-t border-border/50">
                <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
                  <div className="space-y-4">
                    <h2 className="font-condensed text-4xl md:text-5xl font-semibold tracking-wide text-foreground uppercase">Our Players</h2>
                    <div className="h-px w-24 bg-foreground/20" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-2 min-[480px]:px-4 md:px-0">
                    {players.map((player, index) => (
                      <div key={player.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <PlayerCard name={player.name} club={player.club} image={player.image} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── ABOUT SECTION ── */}
              <section id="about" className="scroll-mt-24 py-16 sm:py-20 md:py-28 px-4 min-[480px]:px-6 md:px-24 bg-background border-t border-border/50">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h2 className="font-condensed text-4xl md:text-5xl font-semibold tracking-wide text-foreground uppercase">Who We Are</h2>
                      <div className="h-px w-24 bg-foreground/20" />
                    </div>
                    <div className="font-body text-base md:text-lg leading-relaxed text-muted-foreground space-y-6">
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

                  {/* Services Box */}
                  <div className="bg-secondary/50 p-8 md:p-10 space-y-6 border border-border/60">
                    <h3 className="font-condensed text-2xl md:text-3xl font-semibold tracking-wide uppercase">Services</h3>
                    <ul className="space-y-3">
                      {services.map((service, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-foreground/40" />
                          <span className="font-condensed text-sm md:text-base tracking-wide text-muted-foreground">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Founder Section */}
                <div className="max-w-5xl mx-auto mt-16 md:mt-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                  {/* Photo — smaller */}
                  <div className="mx-auto w-full max-w-[280px] md:max-w-[320px] aspect-[3/4] bg-muted relative overflow-hidden group cursor-default border border-border/40">
                    <img
                      src="/michaela.jpg"
                      alt="Michaela Gooden"
                      className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent pointer-events-none" />
                  </div>
                  <div className="space-y-5">
                    <h3 className="font-condensed text-3xl md:text-4xl font-semibold tracking-wide uppercase">Michaela Gooden</h3>
                    <p className="font-condensed text-xs md:text-sm tracking-[0.25em] uppercase text-muted-foreground">Lead Intermediary & Founder</p>
                    <div className="space-y-4 font-body text-base md:text-lg leading-relaxed text-muted-foreground">
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
              </section>

              {/* ── CONTACT SECTION ── dark for contrast */}
              <section id="contact" className="scroll-mt-24 py-16 sm:py-20 md:py-28 px-4 min-[480px]:px-6 md:px-24 bg-foreground text-background border-t border-border/50">
                <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
                  <div className="space-y-4">
                    <h2 className="font-condensed text-4xl md:text-5xl font-semibold tracking-wide uppercase text-background">Inquire</h2>
                    <div className="h-px w-24 bg-background/30 mx-auto" />
                  </div>
                  <p className="font-body text-lg sm:text-xl md:text-2xl text-background/75 leading-relaxed max-w-2xl mx-auto">
                    For representation or partnership inquiries, please reach out to our team.
                  </p>
                  <a
                    href="mailto:info@mrsgray.agency"
                    className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base sm:text-lg md:text-xl font-condensed tracking-wider hover:opacity-70 transition-opacity text-background"
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
                        <social.icon className="w-5 h-5 text-background/70 group-hover:text-background transition-colors" />
                        <span className="font-condensed text-[10px] tracking-[0.2em] uppercase text-background/60 group-hover:text-background/90">{social.label}</span>
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
