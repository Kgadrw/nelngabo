import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Music3, Music4, Disc3, Youtube, Radio, Search, Phone, Mail, Instagram, Twitter, Music2, Facebook } from "lucide-react";

type PlatformSearchItem = {
  id: string;
  label: string;
  category: string;
  keywords: string[];
  description?: string;
  targetId?: string;
  elementId?: string;
  externalUrl?: string;
};

const BASE_SEARCH_ITEMS: PlatformSearchItem[] = [
  {
    id: "section-music",
    label: "Music Catalog",
    category: "Section",
    targetId: "music",
    description: "Explore every album and track released so far.",
    keywords: ["music", "albums", "tracks", "discography"],
  },
  {
    id: "section-videos",
    label: "Video Library",
    category: "Section",
    targetId: "videos",
    description: "Watch latest releases, live sessions, and behind the scenes.",
    keywords: ["videos", "youtube", "live", "behind the scenes"],
  },
  {
    id: "section-tours",
    label: "Upcoming Tours",
    category: "Section",
    targetId: "tours",
    description: "See the full schedule and get tickets.",
    keywords: ["tour", "tickets", "schedule", "live"],
  },
];

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dynamicSearchItems, setDynamicSearchItems] = useState<PlatformSearchItem[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const collectDynamicItems = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-search-item]"));
      const items: PlatformSearchItem[] = elements.map((element, index) => {
        const keywords =
          element.dataset.searchKeywords?.split("|").map((keyword) => keyword.trim()).filter(Boolean) ?? [];
        return {
          id: element.dataset.searchId ?? element.id ?? `dynamic-${index}`,
          label: element.dataset.searchLabel ?? "Untitled",
          category: element.dataset.searchCategory ?? "Content",
          description: element.dataset.searchDescription,
          keywords,
          targetId: element.dataset.searchTarget,
          elementId: element.dataset.searchTargetElement ?? element.id,
          externalUrl: element.dataset.searchExternalUrl,
        };
      });
      setDynamicSearchItems(items);
    };

    collectDynamicItems();
  }, []);

  const searchIndex = useMemo(() => {
    const project = (item: PlatformSearchItem) => ({
      ...item,
      searchText: `${item.label} ${item.category} ${item.description ?? ""} ${item.keywords.join(" ")}`.toLowerCase(),
    });
    return [...BASE_SEARCH_ITEMS.map(project), ...dynamicSearchItems.map(project)];
  }, [dynamicSearchItems]);

  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return searchIndex.slice(0, 6);
    const query = searchQuery.toLowerCase();
    return searchIndex.filter((item) => item.searchText.includes(query)).slice(0, 8);
  }, [searchQuery, searchIndex]);

  const handleNavigate = (item: typeof searchIndex[number]) => {
    if (item.externalUrl) {
      window.open(item.externalUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (item.targetId) {
      document.getElementById(item.targetId)?.scrollIntoView({ behavior: "smooth" });
    }
    if (item.elementId) {
      document.getElementById(item.elementId)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    const topMatch = filteredSuggestions[0];
    if (topMatch) {
      handleNavigate(topMatch);
    } else {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(trimmedQuery)}`, "_blank", "noopener,noreferrer");
    }
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    } else {
      searchInputRef.current?.blur();
    }
  }, [isSearchOpen]);

  const glowStyle = `
    @keyframes glow {
      0%, 100% {
        text-shadow: 0 0 5px rgba(236, 72, 153, 0.5), 0 0 10px rgba(236, 72, 153, 0.3);
        filter: drop-shadow(0 0 5px rgba(236, 72, 153, 0.5)) drop-shadow(0 0 10px rgba(236, 72, 153, 0.3));
      }
      50% {
        text-shadow: 0 0 15px rgba(236, 72, 153, 0.8), 0 0 25px rgba(236, 72, 153, 0.6);
        filter: drop-shadow(0 0 15px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 25px rgba(236, 72, 153, 0.6));
      }
    }
    .play-icon-glow {
      animation: glow 2s ease-in-out infinite;
    }
  `;

  return (
    <>
      <style>{glowStyle}</style>
    <section className="relative h-screen w-full overflow-hidden border-0 p-4 bg-black">
      <div className="absolute right-6 top-6 z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsSearchOpen((prev) => !prev)}
          className={`flex h-10 w-10 items-center justify-center border border-white/40 bg-black/80 text-white shadow-lg transition hover:border-white hover:bg-black ${
            isSearchOpen ? "border-white bg-black" : ""
          }`}
          aria-label="Toggle search"
        >
          <Search className="h-4 w-4" strokeWidth={2.5} />
        </button>
        {isSearchOpen && (
          <div className="relative">
            <form
              onSubmit={handleSearch}
              className="flex items-center border border-white/20 bg-black/80 px-4 py-2 text-white backdrop-blur-xl shadow-lg"
            >
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search anything..."
                className="w-36 sm:w-52 bg-transparent text-xs uppercase tracking-[0.3em] text-white placeholder:text-white/30 focus:outline-none"
                onBlur={(event) => {
                  // delay closing to allow suggestion click
                  setTimeout(() => {
                    const nextTarget = event.relatedTarget as HTMLElement | null;
                    if (!nextTarget?.classList.contains("search-suggestion")) {
                      setIsSearchOpen(false);
                    }
                  }, 120);
                }}
              />
            </form>
            {filteredSuggestions.length > 0 ? (
              <ul className="absolute top-full mt-2 w-full divide-y divide-white/10 border border-white/10 bg-black/95 text-white shadow-2xl">
                {filteredSuggestions.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="search-suggestion block w-full px-4 py-3 text-left transition hover:bg-white/10"
                      onClick={() => {
                        handleNavigate(item);
                        setSearchQuery("");
                        setIsSearchOpen(false);
                      }}
                    >
                      <p className="text-[0.55rem] uppercase tracking-[0.35em] text-white/50">{item.category}</p>
                      <p className="text-sm font-semibold tracking-wide text-white">{item.label}</p>
                      {item.description && (
                        <p className="text-[0.65rem] text-white/60">{item.description}</p>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              searchQuery.trim() && (
                <div className="absolute top-full mt-2 w-full border border-white/10 bg-black/95 px-4 py-3 text-xs uppercase tracking-[0.25em] text-white/60 shadow-2xl">
                  <p>No matching content on the platform.</p>
                  <button
                    type="button"
                    className="mt-2 underline"
                    onClick={() => {
                      window.open(
                        `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    Search on Google
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/hero.jpeg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
      <div className="relative h-full flex items-end justify-between pb-20 px-4 sm:px-8 lg:px-12 gap-8">
        <div className="space-y-6 max-w-2xl animate-fade-in text-center sm:text-left mx-auto sm:mx-0">
          <div className="relative">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tighter relative z-10"
              style={{ fontFamily: '"Kablammo", "Oi", cursive' }}
            >
              NEL NGABO
            </h1>
            {/* Glitch effect text shadow */}
            <h1
              className="hidden sm:block text-5xl md:text-7xl lg:text-8xl font-normal tracking-tighter absolute top-0 left-0 opacity-50 text-gray-medium"
              style={{
                transform: "translate(2px, 2px)",
                fontFamily: '"Kablammo", "Oi", cursive',
              }}
              aria-hidden="true"
            >
              NEL NGABO
            </h1>
          </div>
          <div className="text-xl md:text-2xl text-gray-medium font-mono flex flex-wrap gap-2">
            <a
              href="/music"
              className="hover:text-foreground transition-colors duration-300 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              MUSIC
            </a>
              <span className="cursor-pointer">•</span>
            <Link
              to="/videos"
              className="hover:text-foreground transition-colors duration-300 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              VIDEOS
            </Link>
              <span className="cursor-pointer">•</span>
            <Link
              to="/tours"
              className="hover:text-foreground transition-colors duration-300 cursor-pointer"
            >
              TOURS
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center">
            <Button asChild size="lg" className="text-lg px-8 group relative overflow-hidden">
              <a
                href="#videos"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative z-10 flex items-center justify-center"
              >
                <span className="relative z-10">LATEST ALBUM</span>
                <div className="absolute inset-0 bg-foreground/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </Button>

            <Button asChild size="lg" variant="outline" className="text-lg px-8 group relative overflow-hidden">
              <a
                href="https://www.youtube.com/@nelngabo9740"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 opacity-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300 transform origin-center" />
                <Play className="w-5 h-5 mr-2 fill-pink-500 text-pink-500 play-icon-glow" />
                <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
                  WATCH NOW
                </span>
              </a>
            </Button>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-4">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.5em] text-white/50">
            <Music3 className="h-4 w-4" />
            Streaming
          </p>
          <div className="flex flex-col gap-3 text-sm tracking-[0.25em] text-white/70">
            <a
              href="https://open.spotify.com/artist/nelngabo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Music4 className="h-4 w-4" />
              <span>Spotify</span>
            </a>
            <a
              href="https://music.apple.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Disc3 className="h-4 w-4" />
              <span>Apple Music</span>
            </a>
            <a
              href="https://www.youtube.com/@nelngabo9740"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Youtube className="h-4 w-4" />
              <span>YouTube</span>
            </a>
            <a
              href="https://soundcloud.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Radio className="h-4 w-4" />
              <span>SoundCloud</span>
            </a>
          </div>
          <div className={`grid grid-cols-3 gap-3 transition-opacity ${isSearchOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}>
            {[
              {
                href: "https://www.tiktok.com/@nelngabo",
                label: "TikTok",
                Icon: Music2,
              },
              {
                href: "https://www.instagram.com/nelngabo",
                label: "Instagram",
                Icon: Instagram,
              },
              {
                href: "https://twitter.com/nelngabo",
                label: "X",
                Icon: Twitter,
              },
              {
                href: "https://www.facebook.com/nelngabo",
                label: "Facebook",
                Icon: Facebook,
              },
              {
                href: "mailto:contact@nelngabo.com",
                label: "Email",
                Icon: Mail,
              },
              {
                href: "tel:+250788123456",
                label: "Phone",
                Icon: Phone,
              },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex h-10 w-10 items-center justify-center border border-white/30 bg-transparent text-white shadow-lg transition hover:border-white hover:text-foreground"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;
