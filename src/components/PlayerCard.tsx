interface PlayerProps {
  name: string;
  club: string;
  image: string;
}

const PlayerCard = ({ name, club, image }: PlayerProps) => {
  return (
    <div className="relative aspect-[3/4] overflow-hidden group border border-border/40">
      {/* Image — colour by default, B&W on hover */}
      <img
        src={image}
        alt={name}
        width={900}
        height={1200}
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-all duration-700 grayscale-0 group-hover:grayscale group-hover:scale-105"
      />

      {/* Always-visible name + club at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pt-12 pb-5 px-5">
        <p className="font-condensed text-xl font-bold tracking-wide text-white leading-tight">{name}</p>
        <p className="font-condensed text-sm font-light tracking-[0.15em] text-white/75 mt-0.5">{club}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
