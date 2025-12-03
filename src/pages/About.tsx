import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp } from "lucide-react";

const instagramImages = [
  "https://instagram.fman4-2.fna.fbcdn.net/v/t51.2885-19/467193798_1257791868652413_8545706296131545497_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fman4-2.fna.fbcdn.net&_nc_cat=103&_nc_ohc=oPbTvGiS4DUQ7kNvwEaXpfq&_nc_gid=1b3a7c4f1b404cd89f59f17f46f2bab5&edm=AEhyXUkBAAAA&ccb=7-5&oh=00_AYH4eDJkLRvIcNkDYy3Q-6fDNnqVxQWN-FsKDhgLiDUvqA&oe=6840DBD4&_nc_sid=8f1549",
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=500&fit=crop",
];

const About = () => {
  const navigate = useNavigate();
  const [imagesVisible, setImagesVisible] = useState<boolean[]>([false, false, false, false]);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Stagger image animations
    const timers = instagramImages.map((_, index) => 
      setTimeout(() => {
        setImagesVisible(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 300 + index * 400)
    );

    // Text fade in
    const textTimer = setTimeout(() => setTextVisible(true), 200);

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
        <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" strokeWidth={1} />
        <span className="text-[10px] tracking-[0.2em] uppercase font-sans">Home</span>
      </button>

      {/* Floating images */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {instagramImages.map((src, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-1000 ease-out ${
              imagesVisible[index] 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-12 scale-95"
            }`}
            style={{
              left: `${10 + (index % 2) * 65 + Math.random() * 10}%`,
              top: `${15 + Math.floor(index / 2) * 40 + Math.random() * 10}%`,
              transform: `rotate(${-5 + index * 3}deg)`,
              zIndex: index,
            }}
          >
            <div className="relative group pointer-events-auto">
              <img
                src={src}
                alt={`Mrs Gray athlete ${index + 1}`}
                className="w-32 md:w-48 lg:w-56 h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                style={{
                  filter: "contrast(1.1)",
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
          className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
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
