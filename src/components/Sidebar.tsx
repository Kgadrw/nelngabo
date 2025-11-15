import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Music4, Clapperboard, MapPin, Menu, X, Instagram, Twitter, Youtube, Sparkles, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type SidebarNavLink = {
  label: string;
  icon: LucideIcon;
  to: string;
};

type SidebarProps = {
  variant?: "frontend" | "admin";
};

const frontendNavLinks: SidebarNavLink[] = [
  { label: "Home", to: "/", icon: Home },
  { label: "Albums", to: "/music", icon: Music4 },
  { label: "Videos", to: "/videos", icon: Clapperboard },
  { label: "Tours", to: "/tours", icon: MapPin },
];

const adminNavLinks: SidebarNavLink[] = [
  { label: "Hero", icon: Sparkles, to: "/admin" },
  { label: "Albums", icon: Music4, to: "/admin/albums" },
  { label: "Videos", icon: Clapperboard, to: "/admin/videos" },
  { label: "Tours", icon: MapPin, to: "/admin/tours" },
  { label: "Account", icon: Home, to: "/admin/account" },
];

const waveHeights = [8, 14, 24, 35, 24, 14, 8];

const waveAnimation = `
  @keyframes wavePulse {
    0%, 100% { transform: scaleY(0.7); opacity: 0.6; }
    50% { transform: scaleY(1.2); opacity: 1; }
  }
`;

const Sidebar = ({ variant = "frontend" }: SidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = variant === "admin" ? adminNavLinks : frontendNavLinks;

  return (
    <>
      <style>{waveAnimation}</style>
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-white/10 bg-black/80 px-8 py-10 text-white backdrop-blur-xl md:flex">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.5em] text-white/50">Artist</p>
          <div className="text-3xl font-bold tracking-[0.45em]">NEL NGABO</div>
        </div>
        <nav className="mt-12 flex flex-1 flex-col gap-3">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={label}
              to={to}
              end={variant === "admin" && to === "/admin"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-[0.3em] transition",
                  isActive ? "bg-white text-black" : "text-white/60 hover:bg-white/10 rounded-2xl",
                ].join(" ")
              }
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        {variant === "frontend" && (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Latest release</p>
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-end gap-[2px]">
                  {waveHeights.map((height, index) => (
                    <span
                      key={index}
                      className="w-[3px] rounded-full bg-gradient-to-t from-pink-500 via-purple-500 to-sky-500"
                      style={{
                        height: `${height * 0.6}px`,
                        animation: "wavePulse 1.4s ease-in-out infinite",
                        animationDelay: `${index * 60}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="text-[0.6rem] font-semibold tracking-[0.4em] text-white">VIBRANIUM</div>
            </div>
            <Button variant="secondary" asChild className="w-full uppercase tracking-[0.3em]">
              <a href="/music">Listen</a>
            </Button>
          </div>
        )}
      </aside>
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-white/10 bg-black/80 px-6 py-4 text-xs uppercase tracking-[0.4em] text-white/70 md:hidden">
        <span>NEL NGABO</span>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center gap-2 text-white"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 text-white flex flex-col p-6 space-y-8 md:hidden">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em]">
            <span>NEL NGABO</span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-white"
              aria-label="Close menu"
            >
              Close
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-3xl font-bold tracking-[0.2em]">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                end={variant === "admin" && to === "/admin"}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "uppercase transition",
                    isActive ? "text-white" : "text-white/60 hover:text-white",
                  ].join(" ")
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Follow</p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/nelngabo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com/nelngabo" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@nelngabo9740" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

