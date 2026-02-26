import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquareText,
  Send,
  User,
  Loader2,
} from "lucide-react";
import { sendContact } from "../api/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, sent, error
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      await sendContact(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <main className="page-container section-padding pt-32 sm:pt-40 text-white">
      <section className="grid xl:grid-cols-12 gap-8 md:gap-10">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="xl:col-span-5 rounded-3xl border border-white/15 bg-white/[0.05] p-6 md:p-7 backdrop-blur-xl"
        >
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-200">
            <MessageSquareText size={14} />
            Get In Touch
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Let’s build something meaningful.
          </h1>
          <p className="mt-5 text-gray-300 leading-relaxed">
            Open to full-stack roles, collaborations, and product-focused
            opportunities. Share your idea, role, or project details and I’ll
            get back to you.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href="mailto:surypanduri5121@gmail.com"
              className="rounded-2xl border border-white/15 bg-white/5 p-4 flex items-center gap-3 w-full hover:bg-white/10 transition group"
            >
              <Mail size={16} className="text-cyan-200 group-hover:scale-110 transition" />
              <span className="text-sm text-gray-200">
                surypanduri5121@gmail.com
              </span>
            </a>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 flex items-center gap-3 w-full">
              <MapPin size={16} className="text-cyan-200" />
              <span className="text-sm text-gray-200">
                Hyderabad, Telangana, India
              </span>
            </div>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="xl:col-span-7 rounded-3xl border border-white/15 bg-white/[0.05] p-6 md:p-7 backdrop-blur-xl"
        >
          <form onSubmit={submit} className="space-y-5">
            <label className="block">
              <span className={`text-sm mb-2 inline-flex items-center gap-2 ${errors.name ? 'text-red-400' : 'text-gray-300'}`}>
                <User size={14} />
                Name
              </span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="How should I call you?"
                className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 outline-none text-gray-100 placeholder:text-gray-500 ${errors.name
                  ? 'border-red-500/50 bg-red-500/5 focus:border-red-400'
                  : 'border-white/10 bg-white/5 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-400/20'
                  }`}
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-400 font-medium pl-1">{errors.name}</p>}
            </label>

            <label className="block">
              <span className={`text-sm mb-2 inline-flex items-center gap-2 ${errors.email ? 'text-red-400' : 'text-gray-300'}`}>
                <Mail size={14} />
                Email
              </span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Where can I reach you?"
                className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 outline-none text-gray-100 placeholder:text-gray-500 ${errors.email
                  ? 'border-red-500/50 bg-red-500/5 focus:border-red-400'
                  : 'border-white/10 bg-white/5 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-400/20'
                  }`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400 font-medium pl-1">{errors.email}</p>}
            </label>

            <label className="block">
              <span className={`text-sm mb-2 inline-flex items-center gap-2 ${errors.message ? 'text-red-400' : 'text-gray-300'}`}>
                <MessageSquareText size={14} />
                Message
              </span>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What's on your mind? Share details about your project or role..."
                className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 outline-none text-gray-100 placeholder:text-gray-500 min-h-[160px] resize-y ${errors.message
                  ? 'border-red-500/50 bg-red-500/5 focus:border-red-400'
                  : 'border-white/10 bg-white/5 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-400/20'
                  }`}
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-400 font-medium pl-1">{errors.message}</p>}
            </label>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed ${status === "sent"
                  ? "bg-green-500/20 border border-green-500/30 text-green-300"
                  : status === "error"
                    ? "bg-red-500/20 border border-red-500/30 text-red-300"
                    : "bg-amber-400 text-black hover:bg-amber-300 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : status === "sent" ? (
                  <>
                    <CheckCircle2 size={18} />
                    Message Sent!
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle size={18} />
                    Failed. Retry?
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>

          {status === "sent" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-green-300 inline-flex items-center gap-2 text-sm font-medium"
            >
              <CheckCircle2 size={16} />
              Thanks! I'll get back to you shortly.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-300 inline-flex items-center gap-2 text-sm font-medium"
            >
              <AlertCircle size={16} />
              Something went wrong. Please check your connection.
            </motion.p>
          )}
        </motion.article>
      </section>
    </main>
  );
}
