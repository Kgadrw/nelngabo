import { ToursEditor } from "@/components/admin/AdminDashboard";
import { useContent } from "@/context/ContentContext";

const ToursAdmin = () => {
  const { content, setContent, refreshContent } = useContent();

  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">Tours</p>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Tour Schedule</h2>
      </div>
      <ToursEditor content={content} setContent={setContent} refreshContent={refreshContent} />
    </section>
  );
};

export default ToursAdmin;


