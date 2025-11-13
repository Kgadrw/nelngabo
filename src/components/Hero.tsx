import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const Hero = () => {
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
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/hero.jpeg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
      <div className="relative h-full flex items-end pb-20 px-4 sm:px-8 lg:px-12">
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
              className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tighter absolute top-0 left-0 opacity-50 text-gray-medium"
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
              href="#music"
              className="hover:text-foreground transition-colors duration-300 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              MUSIC
            </a>
              <span className="cursor-pointer">•</span>
            <a
              href="#videos"
              className="hover:text-foreground transition-colors duration-300 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              VIDEOS
            </a>
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
      </div>
    </section>
    </>
  );
};

export default Hero;
