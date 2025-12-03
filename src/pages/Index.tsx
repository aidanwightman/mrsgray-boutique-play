import AnimatedLogo from "@/components/AnimatedLogo";
import { useEffect, useState } from "react";

const Index = () => {
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTagline(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* SEO */}
      <h1 className="sr-only">Mrs Gray - Premier Boutique Football Agency for Women's Football</h1>
      
      <main className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden selection:bg-foreground selection:text-background">
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-noise" />
        
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
        
        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6">
          <AnimatedLogo />
          
          {/* Tagline */}
          <p 
            className={`mt-16 md:mt-20 text-muted-foreground tracking-[0.25em] uppercase text-[10px] md:text-xs font-sans font-light transition-all duration-1000 ${
              showTagline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Boutique Football Agency
          </p>

          {/* Decorative dots */}
          <div 
            className={`flex items-center gap-3 mt-8 transition-all duration-700 delay-300 ${
              showTagline ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
          </div>
        </div>

        {/* Footer hint */}
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${
            showTagline ? "opacity-100" : "opacity-0"
          }`}
        >
          <a 
            href="https://www.instagram.com/mrsgrayagency/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground/50 hover:text-muted-foreground text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 font-sans"
          >
            @mrsgrayagency
          </a>
        </div>
      </main>
    </>
  );
};

export default Index;
