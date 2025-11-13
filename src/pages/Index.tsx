import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MusicSection from "@/components/MusicSection";
import VideosSection from "@/components/VideosSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { hash } = useLocation();

  const showMusic = hash === "#music";
  const showVideos = hash === "#videos";
  const hasActiveSection = showMusic || showVideos;

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(hash);
    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [hash]);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <Hero />
        {showMusic && <MusicSection />}
        {showVideos && <VideosSection />}
        {hasActiveSection && <Footer />}
      </div>
    </>
  );
};

export default Index;
