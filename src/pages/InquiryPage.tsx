import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import HeroNav from "@/components/HeroNav";
import mrsGrayScript from "@/assets/script-font-bg.png";

const enquiryTypes = [
  "Player representation",
  "Commercial partnership",
  "Media & press",
  "General enquiry",
];

const FORMSPREE_ID = "YOUR_FORM_ID"; // ← swap in your Formspree form ID

const EnquiryPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const inputBase = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.9)",
    outline: "none",
  } as React.CSSProperties;

  const labelCls = "font-condensed text-xs tracking-[0.25em] uppercase block mb-2";
  const inputCls = "w-full px-4 py-3.5 font-condensed text-base tracking-wide transition-all duration-200 focus:outline-none";

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
          <HeroNav activeSection="contact" />
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

      <main className="px-4 min-[480px]:px-6 md:px-24" style={{ paddingTop: "18vh", paddingBottom: "12vh" }}>

        {/* Warm glow */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(196,164,112,0.09) 0%, transparent 70%)", zIndex: 0 }} />

        {/* Ghost logo */}
        <div aria-hidden="true" className="pointer-events-none select-none fixed right-0 top-1/2 -translate-y-1/2 pr-4 md:pr-16"
          style={{ opacity: 0.03, zIndex: 0 }}>
          <img src={mrsGrayScript} alt="" className="h-[30vh] w-auto" />
        </div>

        <div className="relative max-w-2xl mx-auto" style={{ zIndex: 1 }}>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 md:mb-16 space-y-4"
          >
            <p className="font-condensed text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(196,164,112,0.65)" }}>
              Mrs Gray Agency
            </p>
            <h1 className="font-condensed text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase leading-none text-foreground">
              Enquire
            </h1>
            <div className="h-px w-20" style={{ background: "linear-gradient(to right, #c4a470, transparent)" }} />
            <p className="font-body text-base md:text-lg leading-relaxed pt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
              For representation or partnership enquiries, fill in the form below and we'll be in touch.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {state.succeeded ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="py-24 space-y-8"
              >
                {/* Animated gold ring + check */}
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Pulsing glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(196,164,112,0.15)", filter: "blur(16px)" }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Gold ring */}
                    <motion.div
                      className="relative w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ border: "1px solid rgba(196,164,112,0.5)", background: "rgba(196,164,112,0.08)" }}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <CheckCircle className="w-8 h-8" style={{ color: "#c4a470" }} />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Text */}
                <motion.div
                  className="space-y-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <p className="font-condensed text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(196,164,112,0.65)" }}>
                    Enquiry received
                  </p>
                  <h2 className="font-condensed text-4xl md:text-5xl uppercase tracking-tight font-bold text-foreground">
                    Thank You
                  </h2>
                  <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(to right, transparent, #c4a470, transparent)" }} />
                  <p className="font-body text-base md:text-lg leading-relaxed pt-2 max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Your enquiry has been received. Someone from the Mrs Gray team will be in touch with you shortly.
                  </p>
                </motion.div>

                {/* Back link */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <a href="/"
                    className="inline-block font-condensed text-xs tracking-[0.25em] uppercase hover:opacity-60 transition-opacity"
                    style={{ color: "rgba(196,164,112,0.6)" }}>
                    ← Back to home
                  </a>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls} style={{ color: "rgba(196,164,112,0.65)" }} htmlFor="name">
                      Full Name <span style={{ color: "#c4a470" }}>*</span>
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      placeholder="Your name"
                      className={inputCls}
                      style={inputBase}
                      onFocus={e => (e.target.style.borderColor = "rgba(196,164,112,0.5)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-sm mt-1" />
                  </div>
                  <div>
                    <label className={labelCls} style={{ color: "rgba(196,164,112,0.65)" }} htmlFor="email">
                      Email <span style={{ color: "#c4a470" }}>*</span>
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      placeholder="your@email.com"
                      className={inputCls}
                      style={inputBase}
                      onFocus={e => (e.target.style.borderColor = "rgba(196,164,112,0.5)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm mt-1" />
                  </div>
                </div>

                {/* Phone + Type */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls} style={{ color: "rgba(196,164,112,0.65)" }} htmlFor="phone">
                      Phone <span style={{ color: "rgba(255,255,255,0.3)", fontStyle: "normal" }}>optional</span>
                    </label>
                    <input
                      id="phone" name="phone" type="tel"
                      placeholder="+44 7700 000000"
                      className={inputCls}
                      style={inputBase}
                      onFocus={e => (e.target.style.borderColor = "rgba(196,164,112,0.5)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <div>
                    <label className={labelCls} style={{ color: "rgba(196,164,112,0.65)" }} htmlFor="type">
                      Enquiry Type <span style={{ color: "#c4a470" }}>*</span>
                    </label>
                    <select
                      id="type" name="type" required
                      className={inputCls}
                      style={{ ...inputBase, appearance: "none" }}
                      onFocus={e => (e.target.style.borderColor = "rgba(196,164,112,0.5)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    >
                      <option value="" disabled selected style={{ background: "#1a1612" }}>Select…</option>
                      {enquiryTypes.map(t => (
                        <option key={t} value={t} style={{ background: "#1a1612" }}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={labelCls} style={{ color: "rgba(196,164,112,0.65)" }} htmlFor="message">
                    Message <span style={{ color: "#c4a470" }}>*</span>
                  </label>
                  <textarea
                    id="message" name="message" required rows={6}
                    placeholder="Tell us about yourself or your enquiry…"
                    className={`${inputCls} resize-none`}
                    style={inputBase}
                    onFocus={e => (e.target.style.borderColor = "rgba(196,164,112,0.5)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm mt-1" />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="inline-flex items-center gap-3 font-condensed text-sm tracking-[0.2em] uppercase transition-all duration-300 px-10 py-4 hover:gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, rgba(196,164,112,0.15), rgba(196,164,112,0.08))",
                      border: "1px solid rgba(196,164,112,0.4)",
                      color: "#c4a470",
                    }}
                    onMouseEnter={e => { if (!state.submitting) e.currentTarget.style.background = "linear-gradient(135deg, rgba(196,164,112,0.25), rgba(196,164,112,0.12))"; }}
                    onMouseLeave={e => (e.currentTarget.style.background = "linear-gradient(135deg, rgba(196,164,112,0.15), rgba(196,164,112,0.08))")}
                  >
                    {state.submitting ? "Sending…" : "Send Enquiry"}
                    {!state.submitting && <Send className="w-4 h-4" />}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="py-8 px-4 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#0a0805" }}>
        <p className="font-condensed text-[10px] md:text-xs tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2026 Mrs Gray Agency. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default EnquiryPage;
