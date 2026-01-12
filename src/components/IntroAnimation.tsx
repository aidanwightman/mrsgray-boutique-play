import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if intro has been shown in this session
    const hasSeenIntro = sessionStorage.getItem("mrsgray-intro-shown");
    
    if (hasSeenIntro) {
      // Skip animation if already shown
      onComplete();
      return;
    }

    // Logo appears first
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 200);

    // Content fades in after logo
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1200);

    // Complete animation
    const completeTimer = setTimeout(() => {
      sessionStorage.setItem("mrsgray-intro-shown", "true");
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(contentTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const hasSeenIntro = sessionStorage.getItem("mrsgray-intro-shown");

  if (hasSeenIntro) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      >
        {/* MG Watermark Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showLogo ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="font-heading text-[120px] md:text-[180px] text-foreground/20 tracking-tighter">
            MG
          </div>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-script text-2xl md:text-3xl text-foreground whitespace-nowrap"
            >
              Mrs Gray
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;



