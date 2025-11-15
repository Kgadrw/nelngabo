import { HeroEditor } from "@/components/admin/AdminDashboard";
import { useContent } from "@/context/ContentContext";

const HeroAdmin = () => {
  const { content, setContent, refreshContent } = useContent();

  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">Hero</p>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Landing content</h2>
      </div>
      <HeroEditor content={content} setContent={setContent} refreshContent={refreshContent} />
    </section>
  );
};

export default HeroAdmin;


