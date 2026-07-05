import { useState } from "react";
import { toast, Toaster } from "sonner";
import { SiteShell } from "@/components/SiteShell";
import { submitContact } from "@/lib/data-store";

export function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      toast.success("Thank you — we'll be in touch soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteShell>
      <Toaster position="top-center" />
      <section className="container-editorial py-16 md:py-24 grid md:grid-cols-12 gap-16">
        <div className="md:col-span-5">
          <div className="eyebrow">Contact</div>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl leading-tight">Start a conversation.</h1>
          <div className="mt-10 space-y-6 text-sm text-muted-foreground">
            <div>
              <div className="eyebrow mb-2">Nellore</div>
              <p>Electric House, Gandhi Center</p>
              <p>+91 8801354995</p>
            </div>
            <div>
              <div className="eyebrow mb-2">Hours</div>
              <p>Mon — Sat, 9:00 — 18:00 </p>
            </div>
            <div>
              <div className="eyebrow mb-2">Email</div>
              <a href="mailto:naveen@archz.studio" className="hover:text-accent">naveen@archz.studio</a>
            </div>
          </div>
          <div className="mt-10 aspect-[16/10] bg-muted overflow-hidden">
            <iframe
              title="Office location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d331.55934816135544!2d79.98507201377126!3d14.453746515625364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4c8cca0e958771%3A0xd3036c2025161f55!2sNellore%2C%20Andhra%20Pradesh!5e1!3m2!1sen!2sin!4v1783270655495!5m2!1sen!2sin"
              className="w-full h-full border-0 grayscale"
              loading="lazy"
            />
          </div>
        </div>
        <form onSubmit={onSubmit} className="md:col-span-6 md:col-start-7 space-y-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Name *</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full border-b border-border/60 bg-transparent py-3 outline-none focus:border-accent" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Email *</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full border-b border-border/60 bg-transparent py-3 outline-none focus:border-accent" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full border-b border-border/60 bg-transparent py-3 outline-none focus:border-accent" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Message *</label>
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2 w-full border border-border/60 bg-transparent p-3 outline-none focus:border-accent resize-none" />
          </div>
          <button type="submit" disabled={loading} className="border border-foreground px-8 py-3 text-sm hover:bg-foreground hover:text-background transition-colors disabled:opacity-50">
            {loading ? "Sending…" : "Send message"}
          </button>
        </form>
      </section>
    </SiteShell>
  );
}
