import { useState } from "react";
import { motion } from "framer-motion";
import GlitchText from "./GlitchText";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Web3FormsResponse = {
  success: boolean;
  message: string;
};

const INITIAL: FormState = { name: "", email: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
          ...form,
        }),
      });
      const data = (await res.json()) as Web3FormsResponse;
      if (data.success) {
        setStatus("success");
        setStatusMsg("Message received. I'll get back to you soon.");
        setForm(INITIAL);
      } else {
        setStatus("error");
        setStatusMsg(data.message ?? "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setStatusMsg("Network error. Please try again.");
    }
  };

  const fieldClass =
    "w-full bg-royal border border-borderline rounded-lg px-4 py-3 font-mono text-sm text-butter/80 placeholder-butter/30 focus:border-tealcyber focus:outline-none transition-colors duration-200";

  const labelClass =
    "block font-mono text-xs text-tealcyber/70 mb-1.5 tracking-widest uppercase";

  const isLoading = status === "loading";

  return (
    <section id="contact" className="section">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mono-label">// CONTACT</p>
          <GlitchText
            text="Get in Touch"
            as="h2"
            className="font-display text-3xl md:text-4xl text-lemon glow-lemon mt-2"
            scrambleOnHover={true}
            animDelay={100}
            scrambleDuration={600}
          />
          <p className="mt-4 font-mono text-sm text-butter/50">
            Open to opportunities, collaborations, and interesting problems.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          className="mt-10 space-y-5"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          noValidate
        >
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              className={fieldClass}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange}
              placeholder="your@email.com"
              className={fieldClass}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={onChange}
              placeholder="What's on your mind?"
              className={`${fieldClass} resize-none`}
              disabled={isLoading}
            />
          </div>

          {statusMsg && (
            <p
              className={`font-mono text-sm ${
                status === "success" ? "text-lemon" : "text-rust"
              }`}
            >
              {status === "success" ? "// " : "! "}
              {statusMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-lemon px-8 py-3 font-mono text-sm font-bold uppercase tracking-widest text-sapphire transition-colors duration-200 hover:bg-lemon/80 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
