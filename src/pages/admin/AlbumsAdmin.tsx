import { AlbumsEditor } from "@/components/admin/AdminDashboard";
import { useContent } from "@/context/ContentContext";

const AlbumsAdmin = () => {
  const { content, setContent, refreshContent } = useContent();

  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">Albums</p>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Discography</h2>
      </div>
      <AlbumsEditor content={content} setContent={setContent} refreshContent={refreshContent} />
    </section>
  );
};

export default AlbumsAdmin;


