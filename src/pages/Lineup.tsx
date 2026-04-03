import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { players, Player } from "@/data/players";
import { useState } from "react";

const PlayerCard = ({ player, index }: { player: Player; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container - 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] overflow-hidden bg-background border border-foreground/10">
        {/* Player Image */}
        <div className="absolute inset-0">
          <img
            src={player.image}
            alt={player.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? "grayscale-0 scale-105 brightness-110 saturate-150" : "grayscale"
            }`}
          />
        </div>

        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Content Overlay - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2 tracking-tight">
              {player.name}
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-foreground/20 text-foreground text-xs font-sans uppercase tracking-wider border border-foreground/30">
                {player.team}
              </span>
              <span className="px-3 py-1 bg-foreground/20 text-foreground text-xs font-sans uppercase tracking-wider border border-foreground/30">
                {player.country}
              </span>
              <span className="px-3 py-1 bg-foreground/20 text-foreground text-xs font-sans uppercase tracking-wider border border-foreground/30">
                {player.position}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Lineup = () => {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-background pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-foreground tracking-tighter mb-4">
              THE LINEUP
            </h1>
            <p className="text-foreground/60 font-sans text-sm uppercase tracking-wider">
              Our Roster of Talent
            </p>
          </motion.div>

          {/* Player Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {players.map((player, index) => (
              <PlayerCard key={player.id} player={player} index={index} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Lineup;



