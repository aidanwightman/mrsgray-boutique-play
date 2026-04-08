import { useState, useEffect, useId, useCallback } from "react";
import { Menu, X } from "lucide-react";

const navItems = ["HOME", "PLAYERS", "ABOUT", "CONTACT"] as const;

interface HeroNavProps {
  activeSection?: string;
}

const HeroNav = ({ activeSection }: HeroNavProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((o) => !o), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={toggleMenu}
        className="relative z-[80] -m-2 flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-foreground/70 hover:text-foreground md:hidden touch-manipulation"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        {isOpen ? <X className="h-5 w-5 shrink-0" aria-hidden /> : <Menu className="h-5 w-5 shrink-0" aria-hidden />}
      </button>

      {/* Desktop nav */}
      <nav className="hidden flex-row items-center gap-6 lg:gap-8 md:flex" aria-label="Main">
        {navItems.map((item, index) => {
          const isActive = activeSection === item.toLowerCase();
          return (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`font-condensed text-xs lg:text-sm tracking-[0.2em] transition-colors duration-300 relative uppercase ${
                isActive || hoveredItem === item
                  ? "text-foreground"
                  : "text-foreground/50 hover:text-foreground"
              }`}
              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="relative inline-block pb-0.5">
                {item}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                )}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Mobile dropdown — compact, slides down below header */}
      <div
        id={menuId}
        className={`fixed left-0 right-0 z-[70] bg-[#111009]/98 backdrop-blur-sm border-b border-white/10 shadow-md md:hidden transition-all duration-200 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto top-[56px]"
            : "opacity-0 -translate-y-1 pointer-events-none top-[56px]"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col py-1" aria-label="Mobile">
          {navItems.map((item) => {
            const slug = item.toLowerCase();
            const isActive = activeSection === slug;
            return (
              <a
                key={item}
                href={`#${slug}`}
                onClick={closeMenu}
                className={`font-condensed text-sm tracking-[0.2em] uppercase px-6 py-3.5 transition-colors duration-150 touch-manipulation border-l-2 ${
                  isActive
                    ? "text-white border-white bg-white/10"
                    : "text-white/50 border-transparent hover:text-white hover:bg-white/5"
                }`}
              >
                {item}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default HeroNav;
