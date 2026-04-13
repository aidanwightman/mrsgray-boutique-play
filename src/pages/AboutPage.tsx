import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import HeroNav from "@/components/HeroNav";
import mrsGrayScript from "@/assets/script-font-bg.png";

const services = [
  "Contract negotiations",
  "Career development — On and off the pitch",
  "Club transfers",
  "Loans",
  "Commercial partnerships",
  "Off pitch marketing and campaigns",
];

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

const AboutPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash === "#contact") {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen text-foreground" style={{ background: "#0a0805" }}>

      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 pt-[env(safe-area-inset-top,0px)] transition-all duration-500 ${
          isScrolled ? "py-2 md:py-3" : "py-4 md:py-5"
        }`}
        style={{
          zIndex: 60,
          background: isScrolled ? "#1c1812" : "#141108",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.6)" : "none",
        }}
      >
        <div className="relative flex justify-between items-center max-w-[1440px] mx-auto w-full px-4 min-[480px]:px-6 md:px-12">
          <HeroNav activeSection="about" />
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

      <main>

        {/* ── HERO BANNER ── */}
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{ paddingTop: "10vh", paddingBottom: "8vh", minHeight: "40vh" }}
        >
          {/* Same warm glow as homepage */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(196,164,112,0.13) 0%, rgba(160,120,60,0.05) 50%, transparent 75%)" }} />

          {/* Glow bloom behind logo */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-[60%] h-[60%] blur-3xl"
              style={{ background: "radial-gradient(ellipse at center, rgba(196,164,112,0.18) 0%, rgba(180,140,80,0.06) 50%, transparent 75%)" }} />
          </div>

          {/* Centred logo */}
          <motion.img
            src={mrsGrayScript}
            alt="Mrs Gray"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="relative select-none pointer-events-none"
            style={{ height: "22vh", width: "auto", maxWidth: "85%", opacity: 0.9 }}
          />
        </div>

        {/* ── WHO WE ARE + SERVICES ── */}
        <section id="about" className="relative scroll-mt-24 py-14 md:py-20 px-4 min-[480px]:px-6 md:px-24 overflow-hidden"
          style={{ background: "#0d0b07" }}>

          {/* Glow — left side for the text column */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 70% at 20% 40%, rgba(196,164,112,0.08) 0%, transparent 65%)" }} />
          {/* Second glow — right side for services */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 50% 60% at 80% 60%, rgba(196,164,112,0.05) 0%, transparent 65%)" }} />

          <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <FadeUp>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="font-condensed text-5xl md:text-6xl font-bold tracking-tight uppercase leading-none text-foreground">Who We Are</h2>
                  <div className="h-px w-24" style={{ background: "linear-gradient(to right, #c4a470, transparent)" }} />
                </div>
                <div className="font-body text-base md:text-lg leading-relaxed space-y-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <p>
                    Mrs Gray is a female-focused, boutique football agency redefining the landscape of women's football.
                    Founded by former professional footballer Michaela Gooden, the agency blends real experience with purpose,
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

            {/* Services List */}
            <FadeUp delay={0.15}>
              <div>
                <div className="h-[2px] w-full mb-6"
                  style={{ background: "linear-gradient(to right, rgba(196,164,112,0.85) 0%, rgba(196,164,112,0.35) 50%, rgba(196,164,112,0.85) 100%)" }} />
                <h3 className="font-condensed text-2xl md:text-3xl font-semibold tracking-wide uppercase text-foreground mb-6">Services</h3>
                <ul style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  {services.map((service, i) => (
                    <li key={i} className="flex items-center justify-between py-4"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <span className="font-condensed text-sm md:text-base tracking-wide"
                        style={{ color: "rgba(255,255,255,0.6)" }}>{service}</span>
                      <span className="shrink-0 ml-4 text-xs" style={{ color: "rgba(196,164,112,0.5)" }}>—</span>
                    </li>
                  ))}
                </ul>
                <div className="h-[2px] w-full mt-0"
                  style={{ background: "linear-gradient(to right, rgba(196,164,112,0.85) 0%, rgba(196,164,112,0.35) 50%, rgba(196,164,112,0.85) 100%)" }} />
              </div>
            </FadeUp>
          </div>

          {/* ── DIVIDER ── */}
          <div className="max-w-5xl mx-auto" style={{ marginTop: "4rem", marginBottom: "4rem" }}>
            <div className="flex items-center gap-6">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(196,164,112,0.5))" }} />
              <span className="font-condensed text-xs tracking-[0.35em] uppercase shrink-0" style={{ color: "rgba(196,164,112,0.5)" }}>Mrs Gray</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(196,164,112,0.5))" }} />
            </div>
          </div>

          {/* ── FOUNDER ── */}
          <FadeUp delay={0.1}>
            <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Glow behind photo */}
              <div aria-hidden="true" className="pointer-events-none absolute -inset-8"
                style={{ background: "radial-gradient(ellipse 60% 60% at 25% 50%, rgba(196,164,112,0.07) 0%, transparent 70%)" }} />

              {/* Photo — full width of column, no fixed max-width so it fills */}
              <div className="relative w-[90%] aspect-[4/5] overflow-hidden group cursor-default"
                style={{
                  background: "#1a1510",
                  border: "1px solid rgba(196,164,112,0.25)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.4)",
                  maskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 55%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 55%, transparent 100%)",
                }}>
                <img
                  src="/michaela-hires-1.jpg"
                  alt="Michaela Gooden"
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Text — starts at top, runs full length of photo */}
              <div className="relative space-y-6">
                <div className="h-px w-12" style={{ background: "linear-gradient(to right, #c4a470, transparent)" }} />

                <div className="space-y-2">
                  <h3 className="font-condensed text-4xl md:text-5xl font-bold tracking-tight uppercase leading-none text-foreground">
                    Michaela Gooden
                  </h3>
                  <p className="font-condensed text-xs md:text-sm tracking-[0.28em] uppercase"
                    style={{ color: "rgba(196,164,112,0.75)" }}>
                    Lead Intermediary & Founder
                  </p>
                </div>

                <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.15)" }} />

                <div className="space-y-6 font-body text-lg md:text-xl leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.7)" }}>
                  <p>
                    Michaela is a former professional footballer who transitioned to representation after a career
                    that spanned youth and senior clubs across England and a scholarship in the US.
                  </p>
                  <p>
                    Her unique blend of on-field experience and creative industry expertise makes her especially
                    equipped to represent women who want to craft a lasting and authentic career.
                  </p>
                  <p>
                    Having experienced the demands of elite sport first-hand, Michaela founded Mrs Gray with a clear
                    vision: to build an agency that treats every client as an individual — not a commodity. One that
                    invests time, shows up consistently, and grows alongside the athlete.
                  </p>
                  <p>
                    Mrs Gray operates at the intersection of sport and culture. Beyond contracts and transfers, the
                    agency works closely with clients to build their personal brand, secure commercial partnerships,
                    and create opportunities that extend well beyond the final whistle.
                  </p>
                  <p>
                    Michaela brings a level of understanding to her work that can only come from lived experience —
                    knowing what it takes mentally, physically, and professionally to sustain a career at the
                    highest level of women's football.
                  </p>
                </div>

                <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />

                <div className="space-y-3">
                  <p className="font-condensed text-xs tracking-[0.25em] uppercase"
                    style={{ color: "rgba(196,164,112,0.6)" }}>
                    Get in touch
                  </p>
                  <a
                    href="mailto:info@mrsgray.agency"
                    className="font-condensed text-base md:text-lg tracking-wide text-foreground hover:opacity-60 transition-opacity"
                  >
                    info@mrsgray.agency
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="relative scroll-mt-24 py-14 sm:py-16 md:py-20 px-4 min-[480px]:px-6 md:px-24 overflow-hidden"
          style={{ background: "#0a0805", borderTop: "1px solid rgba(255,255,255,0.06)" }}>

          {/* Centred glow */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(196,164,112,0.1) 0%, transparent 70%)" }} />

          <div className="relative max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
            <FadeUp>
              <div className="space-y-4">
                <h2 className="font-condensed text-5xl md:text-7xl font-bold tracking-tight uppercase text-foreground leading-none">Enquire</h2>
                <div className="h-px w-24 mx-auto"
                  style={{ background: "linear-gradient(to right, rgba(196,164,112,0.85) 0%, rgba(196,164,112,0.35) 50%, rgba(196,164,112,0.85) 100%)" }} />
              </div>
            </FadeUp>
            <p className="font-body text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              For representation or partnership enquiries, please reach out to our team.
            </p>
            <a
              href="/enquire"
              className="inline-flex items-center gap-3 font-condensed text-sm tracking-[0.22em] uppercase transition-all duration-300 px-12 py-4 hover:gap-4"
              style={{
                background: "linear-gradient(135deg, rgba(196,164,112,0.15), rgba(196,164,112,0.08))",
                border: "1px solid rgba(196,164,112,0.4)",
                color: "#c4a470",
              }}
            >
              Start an Enquiry
            </a>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 pt-6 md:pt-10">
              {[
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mrsgrayagency/" },
                { icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/company/mrs-gray-sports-agency/" },
                { icon: Twitter,   label: "Twitter",   href: "https://x.com/mrsgrayagency" },
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group min-w-[4.5rem] touch-manipulation">
                  <social.icon className="w-5 h-5 transition-colors group-hover:opacity-100"
                    style={{ color: "rgba(255,255,255,0.4)" }} />
                  <span className="font-condensed text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "rgba(255,255,255,0.35)" }}>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#0a0805" }}>
        <p className="font-condensed text-[10px] md:text-xs tracking-[0.25em] uppercase"
          style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2026 Mrs Gray Agency. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
