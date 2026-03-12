"use client";

import { useTransition, useState, useEffect } from "react";
import { submitFeedback } from "./actions";
import { toast } from "react-hot-toast";
import { Send, RefreshCcw } from "lucide-react";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const refreshCaptcha = () => {
    setCaptcha({
      a: Math.floor(Math.random() * 10) + 1,
      b: Math.floor(Math.random() * 10) + 1,
    });
  };

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitFeedback(formData);
      if (result?.error) {
        toast.error(result.error);
        refreshCaptcha();
      } else {
        toast.success(result.success || "Message sent!");
        (document.getElementById("contact-form") as HTMLFormElement).reset();
        refreshCaptcha();
      }
    });
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-6 text-left">
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Your Name *</label>
        <input
          name="fb_name"
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          placeholder="e.g. Rahul Sharma"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Mobile *</label>
          <input
            name="fb_mobile"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
            placeholder="10 digit number"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email *</label>
          <input
            name="fb_email"
            type="email"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
            placeholder="name@email.com"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Your Queries *</label>
        <textarea
          name="fb_comments"
          required
          rows={4}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none resize-none"
          placeholder="How can we help you?"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Solve this to verify: {captcha.a} + {captcha.b} = ? *</label>
        <div className="flex items-center gap-4">
          <input
            name="code"
            required
            className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          />
          <button 
            type="button" 
            onClick={refreshCaptcha}
            className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
        <input type="hidden" name="confirmationCode" value={captcha.a + captcha.b} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all disabled:bg-slate-300 disabled:shadow-none mt-4 flex items-center justify-center space-x-2 group"
      >
        <span>{isPending ? "Sending..." : "Send Message"}</span>
        {!isPending && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
      </button>
    </form>
  );
}
