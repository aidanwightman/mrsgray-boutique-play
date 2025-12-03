import { ChevronDown } from "lucide-react";

interface PageTurnIndicatorProps {
  visible: boolean;
  onClick: () => void;
}

const PageTurnIndicator = ({ visible, onClick }: PageTurnIndicatorProps) => {
  return (
    <button
      onClick={onClick}
      className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-all duration-500 cursor-pointer group ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Continue to next page"
    >
      <span className="text-[10px] tracking-[0.3em] uppercase font-sans">Discover</span>
      <div className="relative">
        <ChevronDown 
          className="w-5 h-5 animate-bounce group-hover:animate-none transition-transform" 
          strokeWidth={1}
        />
      </div>
    </button>
  );
};

export default PageTurnIndicator;
