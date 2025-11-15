import VideosSection from "@/components/VideosSection";
import Sidebar from "@/components/Sidebar";

const Videos = () => {
  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-background pt-16 md:pl-72 md:pt-0">
        <VideosSection />
      </div>
    </>
  );
};

export default Videos;

