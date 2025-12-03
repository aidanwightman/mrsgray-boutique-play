import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import athleteSpence from "@/assets/athlete-spence.png";
import athleteAward from "@/assets/athlete-award.png";
import athleteFocus from "@/assets/athlete-focus.png";
import athleteCelebration from "@/assets/athlete-celebration.png";
import athleteHandshake from "@/assets/athlete-handshake.png";
import athleteGoalkeeper from "@/assets/athlete-goalkeeper.png";
import athleteBlue from "@/assets/athlete-blue.png";

// Positioned around the edges, avoiding center text area
const aboutImages = [
  { src: athleteSpence, position: { left: "2%", top: "5%" }, rotation: -2, size: "w-24 md:w-36 lg:w-44" },
  { src: athleteAward, position: { right: "3%", top: "8%" }, rotation: 2, size: "w-24 md:w-32 lg:w-40" },
  { src: athleteFocus, position: { left: "3%", top: "45%" }, rotation: 1, size: "w-20 md:w-28 lg:w-36" },
  { src: athleteGoalkeeper, position: { right: "2%", top: "40%" }, rotation: -1, size: "w-22 md:w-30 lg:w-38" },
  { src: athleteCelebration, position: { left: "5%", bottom: "8%" }, rotation: 2, size: "w-24 md:w-32 lg:w-40" },
  { src: athleteBlue, position: { right: "5%", bottom: "10%" }, rotation: -2, size: "w-24 md:w-36 lg:w-44" },
  { src: athleteHandshake, position: { left: "50%", bottom: "3%", transform: "translateX(-50%)" }, rotation: 0, size: "w-28 md:w-36 lg:w-44" },
];

const About = () => {
  const navigate = useNavigate();
  const [imagesVisible, setImagesVisible] = useState<boolean[]>(new Array(aboutImages.length).fill(false));
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Stagger image animations smoothly
    const timers = aboutImages.map((_, index) => 
      setTimeout(() => {
        setImagesVisible(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 400 + index * 150)
    );

    // Text fade in
    const textTimer = setTimeout(() => setTextVisible(true), 300);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-foreground selection:text-background">
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-noise" />
      
      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* Back to home button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300 group"
        aria-label="Back to home"
      >
        <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" strokeWidth={1} />
        <span className="text-[10px] tracking-[0.2em] uppercase font-sans">Home</span>
      </button>

      {/* Floating images positioned around edges */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {aboutImages.map((image, index) => (
          <div
            key={index}
            className="absolute transition-all ease-out"
            style={{
              ...image.position,
              zIndex: index,
              opacity: imagesVisible[index] ? 1 : 0,
              transitionDuration: '1000ms',
            }}
          >
            <div 
              className="relative group pointer-events-auto"
              style={{ transform: `rotate(${image.rotation}deg)` }}
            >
              <img
                src={image.src}
                alt={`Mrs Gray athlete ${index + 1}`}
                className={`${image.size} h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl`}
                style={{ filter: "contrast(1.05)" }}
              />
              <div className="absolute inset-0 border border-foreground/10" />
            </div>
          </div>
        ))}
      </div>

      {/* Main content - centered with max width */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <div 
          className="max-w-lg mx-auto text-center transition-all duration-1000 ease-out"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light italic text-foreground mb-8 tracking-tight">
            Who We Are
          </h1>
          
          <div className="space-y-6 text-muted-foreground font-sans font-light text-sm md:text-base leading-relaxed tracking-wide">
            <p>
              Mrs Gray is a female-focused, boutique football agency redefining the landscape of women's football.
            </p>
            
            <p>
              Founded by former footballer <span className="text-foreground italic">Michaela Gooden</span>, 
              the agency blends real experience with purpose, representing a carefully selected group of athletes.
            </p>
            
            <p>
              As a boutique agency, we thrive on intention—prioritising time, trust, and tailored support.
            </p>
            
            <p className="text-foreground/80 font-serif italic text-lg md:text-xl mt-10">
              We celebrate the woman behind the athlete, empowering each client to grow with confidence, 
              express their individuality, and leave a legacy both on and off the pitch.
            </p>
          </div>

          {/* Decorative element */}
          <div className="mt-16 flex items-center justify-center gap-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-muted-foreground/30" />
            <span className="text-muted-foreground/40 font-serif italic text-sm">Est. 2024</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-muted-foreground/30" />
          </div>

          {/* Instagram link */}
          <a 
            href="https://www.instagram.com/mrsgrayagency/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-12 text-muted-foreground/50 hover:text-muted-foreground text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 font-sans"
          >
            @mrsgrayagency
          </a>
        </div>
      </div>
    </main>
  );
};

export default About;
