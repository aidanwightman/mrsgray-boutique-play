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

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const scrollY = window.scrollY;
    const prev = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
    };
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.left = prev.left;
      document.body.style.right = prev.right;
      document.body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        className="relative z-[80] -m-2 flex min-h-[48px] min-w-[48px] items-center justify-center p-3 text-foreground/70 hover:text-primary active:text-primary md:hidden touch-manipulation"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        {isOpen ? <X className="h-6 w-6 shrink-0" aria-hidden /> : <Menu className="h-6 w-6 shrink-0" aria-hidden />}
      </button>

      <nav
        className="animate-slide-in-left hidden flex-row items-center gap-6 lg:gap-8 md:flex"
        aria-label="Main"
      >
        {navItems.map((item, index) => {
          const isActive = activeSection === item.toLowerCase();
          return (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`font-body text-[10px] lg:text-xs tracking-[0.2em] transition-colors duration-300 relative ${
                isActive || hoveredItem === item
                  ? "text-primary"
                  : "text-foreground/60 hover:text-foreground"
              }`}
              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="relative inline-block pb-0.5">
                {item}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-primary animate-fade-in" />
                )}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Full-screen mobile menu: fixed to viewport (header has no transform / mobile blur). */}
      <div
        id={menuId}
        className={`fixed inset-0 z-[70] flex flex-col bg-[#161412] md:hidden overscroll-none transition-opacity duration-200 ease-out motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Top padding so centered links clear the header; close via top-left burger (z-80). */}
        <div
          className="shrink-0 pt-[max(4.5rem,env(safe-area-inset-top,0px))]"
          aria-hidden
        />

        <nav
          className="flex min-h-0 flex-1 flex-col items-center justify-center gap-1 px-4"
          aria-label="Mobile"
        >
          {navItems.map((item) => {
            const slug = item.toLowerCase();
            const isActive = activeSection === slug;
            return (
              <a
                key={item}
                href={`#${slug}`}
                onClick={closeMenu}
                className={`flex min-h-[48px] w-full max-w-md items-center justify-center rounded-sm py-3 text-center font-display text-[1.65rem] min-[400px]:text-4xl italic tracking-wide transition-colors duration-150 touch-manipulation ${
                  isActive ? "text-primary" : "text-foreground/75 active:text-foreground"
                }`}
              >
                {item}
              </a>
            );
          })}
        </nav>

        <div className="shrink-0 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] text-center opacity-40">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-foreground">Mrs Gray</p>
        </div>
      </div>
    </>
  );
};

export default HeroNav;
