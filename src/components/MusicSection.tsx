"use client";

import { Play } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";

const albums = [
  {
    id: 1,
    title: "LATEST ALBUM",
    year: "2024",
    image: "/Album.jpeg",
    tracks: ["Intro", "Heartbeat", "Midnight Drive", "Echoes", "Finale"],
  },
  {
    id: 2,
    title: "SECOND ALBUM",
    year: "2023",
    image: "/Album.jpeg",
    tracks: ["Start", "Waves", "Hold On", "Skyline"],
  },
  {
    id: 3,
    title: "DEBUT ALBUM",
    year: "2022",
    image: "/Album.jpeg",
    tracks: ["Opening", "Road", "Nightfall"],
  },
];

const MusicSection = () => {
  const orbitronStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
    .orbitron {
      font-family: "Orbitron", sans-serif;
      font-optical-sizing: auto;
      font-style: normal;
    }
  `;

  return (
    <>
      <style>{orbitronStyle}</style>
      <section id="music" className="py-24 bg-background relative overflow-hidden p-4">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-foreground rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-foreground" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter animate-fade-in">MUSIC</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album, index) => (
              <div
                key={album.id}
                className="group relative overflow-hidden bg-card border border-border hover:border-foreground transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* IMAGE LAYER */}
                <div className="aspect-square overflow-hidden relative z-0">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground to-transparent opacity-0 group-hover:opacity-10 transform translate-x-full group-hover:translate-x-[-100%] transition-all duration-1000" />
                </div>

                {/* PLAY OVERLAY — no click blocking when hidden */}
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
                  <button className="w-20 h-20 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-125 transition-transform duration-300">
                    <Play className="w-10 h-10 ml-1" fill="currentColor" />
                  </button>
                </div>

                {/* INFO + ACCORDION */}
                <div className="relative z-20 p-6 border-t border-border bg-background">
                  <h3 className="text-xl font-bold mb-1 group-hover:translate-x-2 transition-transform duration-300 orbitron">
                    {album.title}
                  </h3>
                  <p className="text-gray-medium mb-4 orbitron">{album.year}</p>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`album-${album.id}`}>
                      <AccordionTrigger className="w-full orbitron">
                        Track List
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
                          {album.tracks.map((track, tIdx) => (
                            <li key={tIdx} className="flex items-center gap-2 orbitron">
                              <span className="w-2 h-2 rounded-full bg-pink-500 inline-block" />
                              <span>{track}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MusicSection;
