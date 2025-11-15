import ToursSection from "@/components/ToursSection";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const Tours = () => {
  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-background pt-24 md:pl-72 md:pt-0">
        <ToursSection />
        <Footer />
      </div>
    </>
  );
};

export default Tours;
