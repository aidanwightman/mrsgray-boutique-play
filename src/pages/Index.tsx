import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import IntroAnimation from "@/components/IntroAnimation";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const navigate = useNavigate();

  // Video placeholder - using a cinematic sports/fashion loop
  // Fallback to a solid background if video fails
  const videoUrl = "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4";

  return (
    <>
      <IntroAnimation onComplete={() => setIntroComplete(true)} />
      
      {introComplete && (
        <>
          <Navigation />
          
          <main className="min-h-screen relative overflow-hidden bg-background">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                onLoadedData={() => setVideoLoaded(true)}
                onError={() => setVideoLoaded(true)} // Fallback if video fails
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
              
              {/* Fallback solid background */}
              <div className="absolute inset-0 bg-background" />
              
              {/* Dark Overlay with blend mode */}
              <div 
                className="absolute inset-0 bg-background/70 mix-blend-overlay"
                style={{ backgroundColor: "rgba(74, 73, 74, 0.85)" }}
              />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
              <div className="text-center max-w-6xl mx-auto">
                {/* Main Heading - Massive, Bold */}
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={videoLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="font-heading text-6xl md:text-8xl lg:text-[12rem] xl:text-[14rem] font-bold text-foreground tracking-tighter leading-none mb-8"
                  style={{ color: "#e2d8cc" }}
                >
                  MRS GRAY
                  <br />
                  <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-normal tracking-wider">
                    AGENCY
                  </span>
                </motion.h1>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={videoLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="mt-12"
                >
                  <button
                    onClick={() => navigate("/lineup")}
                    className="px-12 py-4 bg-foreground text-background font-heading text-lg tracking-wider uppercase hover:bg-foreground/90 transition-all duration-300 border-2 border-foreground"
                    style={{ 
                      backgroundColor: "#e2d8cc",
                      color: "#4a494a",
                      borderRadius: "0"
                    }}
                  >
                    View The Lineup
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={videoLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
            >
              <div className="flex flex-col items-center gap-2 text-foreground/60">
                <span className="text-xs font-sans tracking-wider uppercase">Scroll</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-px h-8 bg-foreground/60"
                />
              </div>
            </motion.div>
          </main>
        </>
      )}
    </>
  );
};

export default Index;
