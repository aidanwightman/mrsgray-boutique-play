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
    bio: "An elite midfielder with clinical precision. London Derby Player of the Match and a cornerstone of the Spurs midfield.",
    image: "/players/drew-spence.jpg"
  },
  {
    name: "Emily Syme",
    club: "Bristol City",
    bio: "Captain Syme leading with vision and tenacity. A technical playmaker whose influence defines the game.",
    image: "/players/emily-syme.jpg"
  },
  {
    name: "Tegan McGowan",
    club: "Charlton Athletic",
    bio: "A dynamic force on the pitch, known for explosive pace and tactical intelligence. A rising star in women's football.",
    image: "/players/tegan-mcgowan.jpg"
  },
  {
    name: "Megan Walsh",
    club: "West Ham United",
    bio: "Reliable, agile, and commanding. A top-tier goalkeeper whose presence provides ultimate security between the posts.",
    image: "/players/megan-walsh.jpg"
  },
  {
    name: "Clara Bellahall",
    club: "Cheltenham Town / Jamaica",
    bio: "Representing with pride on the national and club stage. A versatile goalscorer with a clinical finishing touch.",
    image: "/players/clara-bellahall.jpg"
  }
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
              className="font-body text-[10px] tracking-[0.35em] uppercase text-muted-foreground"
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
          return rect.top <= 100 && rect.bottom >= 100;
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
                ? 'max-md:bg-[#1a1816]/96 md:bg-[#1a1816]/88 md:backdrop-blur-md border-b border-border/50 py-2 md:py-3 shadow-md'
                : 'bg-transparent py-4 md:py-5'
            }`}
          >
            <div className="flex justify-between items-center max-w-[1440px] mx-auto w-full px-4 min-[480px]:px-6 md:px-12">
              <HeroNav activeSection={activeSection} />
              <div className="shrink-0 pl-2">
                <p className="font-body text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] text-muted-foreground uppercase">
                  Women's Football Agency
                </p>
              </div>
            </div>
          </header>

          <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">
            {/* Background Logo Watermark */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.02]">
              <img src={mrsGrayScript} alt="" className="w-[110%] md:w-[70%] max-w-[1100px] select-none" />
            </div>

            {/* Hidden SEO Content */}
            <div className="sr-only" aria-hidden="true">
              <h1>Mrs Gray - London Women's Football Agency</h1>
              <p>
                Mrs Gray is the premier women's football agency in London, offering elite player representation and football management.
                As a leading London football agency, we specialize in women's football and Mrs Gray football services across all London boroughs.
              </p>
            </div>

            <main className="relative z-10">
              {/* Hero Section */}
              <section id="home" className="relative scroll-mt-20 md:scroll-mt-16 min-h-dvh flex flex-col px-4 min-[480px]:px-6 md:px-12 pt-4 md:pt-6 pb-0">
                <div className="h-14 sm:h-16 md:h-16" />

                <div className="flex-1 flex flex-col justify-between animate-fade-in">
                  {/* Mrs Gray Script Logo */}
                  <div className="flex justify-center pt-2 md:pt-4 overflow-hidden">
                    <img
                      src={mrsGrayScript}
                      alt="Mrs Gray"
                      className="w-full max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[25vh] md:max-h-[28vh] object-contain opacity-80 select-none pointer-events-none"
                    />
                  </div>

                  {/* Hero Text */}
                  <div className="flex flex-col gap-3 md:gap-4 pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 px-2 min-[480px]:px-4 md:px-8">
                      <h1 className="font-display text-2xl min-[400px]:text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl italic leading-[1.12] text-foreground/90">
                        Elevating women's football,
                      </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 px-2 min-[480px]:px-4 md:px-8">
                      <p className="font-display text-2xl min-[400px]:text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl italic leading-[1.12] text-primary/80">
                        one player at a time
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="flex items-end justify-between px-2 min-[480px]:px-4 md:px-8 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:pb-6 md:pb-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
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
                        className="font-body text-[10px] md:text-xs tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              {/* Players Section */}
              <section id="players" className="scroll-mt-16 md:scroll-mt-20 py-12 sm:py-16 md:py-24 px-4 min-[480px]:px-6 md:px-24 bg-secondary/30 relative">
                <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
                  <div className="space-y-4">
                    <h2 className="font-display text-3xl md:text-4xl italic text-primary">Our Players</h2>
                    <div className="h-px w-24 bg-primary/30" />
                    <p className="md:hidden font-body text-xs tracking-[0.12em] text-muted-foreground uppercase">
                      Tap a player to read their bio
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 px-2 min-[480px]:px-4 md:px-0">
                    {players.map((player, index) => (
                      <div key={player.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <PlayerCard {...player} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section id="about" className="scroll-mt-16 md:scroll-mt-20 py-12 sm:py-16 md:py-24 px-4 min-[480px]:px-6 md:px-24">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h2 className="font-display text-3xl md:text-4xl italic text-primary">Who We Are</h2>
                      <div className="h-px w-24 bg-primary/30" />
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

                  <div className="bg-secondary/50 p-8 md:p-12 space-y-8 border border-border/50">
                    <h3 className="font-display text-xl md:text-2xl italic">Our Mission</h3>
                    <ul className="space-y-6 md:space-y-8">
                      {[
                        { title: "Career-first representation", desc: "Contract negotiation, club placement and long-term planning." },
                        { title: "Brand & creative development", desc: "Strategic partnerships, creative direction, and media strategy." },
                        { title: "Whole-person support", desc: "Wellbeing, lifestyle guidance and off-pitch opportunities." }
                      ].map((item, i) => (
                        <li key={i} className="space-y-2">
                          <h4 className="font-body text-xs md:text-sm tracking-[0.2em] uppercase text-primary/80">{item.title}</h4>
                          <p className="font-body text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Founder Section */}
                <div className="max-w-5xl mx-auto mt-12 sm:mt-16 md:mt-24 grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center px-2 min-[480px]:px-4 md:px-0">
                  <div className="aspect-[4/5] max-md:max-h-[min(85vh,520px)] md:max-h-none mx-auto w-full bg-muted relative overflow-hidden contrast-[1.02] group cursor-default">
                    <img
                      src="/michaela.jpg"
                      alt="Michaela Gooden"
                      className="w-full h-full object-cover object-top md:object-center transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/40 to-transparent flex flex-col justify-end p-6 transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100">
                      <div className="space-y-1 transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                        <h3 className="font-display text-2xl italic text-primary">Michaela Gooden</h3>
                        <p className="font-body text-xs tracking-[0.2em] uppercase text-foreground/60">Mrs Gray</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="font-display text-2xl md:text-3xl italic">Michaela Gooden</h3>
                    <p className="font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-foreground/60 mb-8">Lead Intermediary & Founder</p>
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

              {/* Contact Section */}
              <section id="contact" className="scroll-mt-16 md:scroll-mt-20 py-12 sm:py-16 md:py-24 px-4 min-[480px]:px-6 md:px-24 bg-card">
                <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12 px-2 min-[480px]:px-4 md:px-0">
                  <div className="space-y-4">
                    <h2 className="font-display text-3xl md:text-4xl italic text-primary">Inquire</h2>
                    <div className="h-px w-24 bg-primary/30 mx-auto" />
                  </div>
                  <p className="font-body text-lg sm:text-xl md:text-3xl text-foreground/80 leading-relaxed max-w-3xl mx-auto text-pretty px-1">
                    For representation or partnership inquiries, please reach out to our team.
                  </p>
                  <a
                    href="mailto:info@mrsgray.agency"
                    className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base sm:text-lg md:text-2xl font-display italic hover:text-primary transition-colors max-w-full px-2 break-words [overflow-wrap:anywhere] touch-manipulation"
                  >
                    <Mail className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                    <span className="text-center">info@mrsgray.agency</span>
                  </a>
                  <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 sm:gap-8 md:gap-12 pt-6 sm:pt-8 md:pt-12">
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
                        className="flex flex-col items-center gap-2 group min-w-[4.5rem] min-h-[48px] justify-center touch-manipulation"
                      >
                        <social.icon className="w-5 h-5 md:w-5 md:h-5 group-hover:text-primary transition-colors" />
                        <span className="text-[10px] md:text-[11px] tracking-[0.18em] md:tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            </main>

            <footer className="py-8 md:py-12 px-4 md:px-6 pb-[max(2rem,env(safe-area-inset-bottom,0px))] border-t border-border/50 text-center">
              <p className="font-body text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground uppercase">
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
