import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const AccountAdmin = () => {
  const { updateCredentials, username } = useAuth();
  const [formState, setFormState] = useState({
    currentPassword: "",
    username: username ?? "",
    password: "",
  });
  const [status, setStatus] = useState<{ message: string; tone: "success" | "error" } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      await updateCredentials({
        currentPassword: formState.currentPassword,
        username: formState.username,
        password: formState.password || undefined,
      });
      setFormState((prev) => ({ ...prev, currentPassword: "", password: "" }));
      setStatus({ message: "Credentials updated successfully.", tone: "success" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to update credentials";
      setStatus({ message, tone: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">Account</p>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Security Settings</h2>
      </div>
      <Card className="border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>Update Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">Current password</label>
              <Input
                type="password"
                value={formState.currentPassword}
                onChange={(event) => setFormState((prev) => ({ ...prev, currentPassword: event.target.value }))}
                required
                className="bg-black/40 text-white placeholder:text-white/40"
                placeholder="Current password"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">Username</label>
              <Input
                value={formState.username}
                onChange={(event) => setFormState((prev) => ({ ...prev, username: event.target.value }))}
                required
                className="bg-black/40 text-white placeholder:text-white/40"
                placeholder="New username"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">New password</label>
              <Input
                type="password"
                value={formState.password}
                onChange={(event) => setFormState((prev) => ({ ...prev, password: event.target.value }))}
                className="bg-black/40 text-white placeholder:text-white/40"
                placeholder="Leave blank to keep existing"
              />
            </div>
            {status && (
              <p className={`text-sm ${status.tone === "success" ? "text-emerald-400" : "text-red-400"}`}>{status.message}</p>
            )}
            <Button type="submit" disabled={isSubmitting} className="w-full uppercase tracking-[0.3em]">
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default AccountAdmin;


