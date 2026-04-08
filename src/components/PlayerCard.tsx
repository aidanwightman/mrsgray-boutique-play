import { useState } from "react";

interface PlayerProps {
  name: string;
  club: string;
  bio: string;
  image: string;
}

const PlayerCard = ({ name, club, bio, image }: PlayerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const showOverlay = isHovered || isExpanded;

  return (
    <div 
      role="button"
      tabIndex={0}
      aria-expanded={showOverlay}
      aria-label={`${name}, ${club}. Press to ${showOverlay ? "hide" : "show"} biography.`}
      className="relative aspect-[3/4] overflow-hidden group cursor-pointer border border-border/50 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsExpanded((prev) => !prev);
        }
      }}
    >
      {/* Player Image - grayscale by default, colored or slightly brightened on hover */}
      <img
        src={image}
        alt={name}
        width={900}
        height={1200}
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-110"
      />

      {/* Hover Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-background/85 via-background/40 to-transparent flex flex-col justify-end p-6 transition-opacity duration-500 pointer-events-none ${
          showOverlay ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className={`space-y-2 transition-transform duration-500 ${
          showOverlay ? "translate-y-0" : "translate-y-4"
        }`}>
          <h3 className="font-display text-2xl italic text-primary">{name}</h3>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-foreground/60">{club}</p>
          <div className="h-px w-12 bg-primary/30 my-3" />
          <p className="font-body text-sm leading-relaxed text-foreground/80">
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
