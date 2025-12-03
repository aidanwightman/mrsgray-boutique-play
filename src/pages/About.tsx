import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import athleteSpence from "@/assets/athlete-spence.png";
import athleteAward from "@/assets/athlete-award.png";
import athleteFocus from "@/assets/athlete-focus.png";
import athleteCelebration from "@/assets/athlete-celebration.png";
import athleteHandshake from "@/assets/athlete-handshake.png";

const aboutImages = [
  { src: athleteSpence, position: { left: "5%", top: "12%" }, rotation: -3 },
  { src: athleteAward, position: { left: "72%", top: "8%" }, rotation: 2 },
  { src: athleteFocus, position: { left: "8%", top: "55%" }, rotation: 2 },
  { src: athleteCelebration, position: { left: "70%", top: "52%" }, rotation: -2 },
  { src: athleteHandshake, position: { left: "38%", top: "75%" }, rotation: 1 },
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
      }, 400 + index * 200)
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

      {/* Floating images with smooth fade animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {aboutImages.map((image, index) => (
          <div
            key={index}
            className="absolute transition-all ease-out"
            style={{
              left: image.position.left,
              top: image.position.top,
              transform: `rotate(${image.rotation}deg)`,
              zIndex: index,
              opacity: imagesVisible[index] ? 1 : 0,
              transitionDuration: '1200ms',
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <div className="relative group pointer-events-auto">
              <img
                src={image.src}
                alt={`Mrs Gray athlete ${index + 1}`}
                className="w-28 md:w-40 lg:w-48 h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                style={{
                  filter: "contrast(1.05)",
                }}
              />
              <div className="absolute inset-0 border border-foreground/10" />
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <div 
          className="max-w-2xl mx-auto text-center transition-all duration-1000 ease-out"
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
