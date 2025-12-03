import { useEffect, useState } from "react";

const AnimatedLogo = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),  // Start "mrs"
      setTimeout(() => setPhase(2), 1200), // Start "gray"
      setTimeout(() => setPhase(3), 2400), // Show underline swash
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      {/* Mrs */}
      <div className="overflow-hidden">
        <h1 
          className={`font-serif text-6xl md:text-8xl lg:text-9xl font-light italic text-foreground tracking-tight transition-all duration-1000 ease-out ${
            phase >= 1 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
          style={{ 
            letterSpacing: '-0.03em',
          }}
        >
          mrs
        </h1>
      </div>
      
      {/* Gray */}
      <div className="overflow-hidden -mt-4 md:-mt-6 lg:-mt-8">
        <h1 
          className={`font-serif text-7xl md:text-9xl lg:text-[10rem] font-light italic text-foreground tracking-tight transition-all duration-1000 ease-out ${
            phase >= 2 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
          style={{ 
            letterSpacing: '-0.03em',
          }}
        >
          gray
        </h1>
      </div>

      {/* Elegant underline swash */}
      <svg 
        viewBox="0 0 300 40" 
        className={`w-48 md:w-64 lg:w-80 -mt-2 md:-mt-4 transition-all duration-1000 ${
          phase >= 3 ? "opacity-100" : "opacity-0"
        }`}
        fill="none"
      >
        <path
          d="M10 25 Q80 25, 150 20 Q220 15, 290 25"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className={`text-foreground/60 ${phase >= 3 ? "animate-swash" : ""}`}
          style={{
            strokeDasharray: 400,
            strokeDashoffset: phase >= 3 ? 0 : 400,
            transition: "stroke-dashoffset 1.5s ease-out",
          }}
        />
      </svg>
    </div>
  );
};

export default AnimatedLogo;
