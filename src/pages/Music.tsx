import MusicSection from "@/components/MusicSection";
import Sidebar from "@/components/Sidebar";

const Music = () => {
  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-background pt-16 md:pl-72 md:pt-0">
        <MusicSection />
      </div>
    </>
  );
};

export default Music;

