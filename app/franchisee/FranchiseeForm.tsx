"use client";

import { useTransition, useState } from "react";
import { submitFranchiseeEnquiry } from "./actions";
import { toast } from "react-hot-toast";
import { Send } from "lucide-react";

interface State {
  state_name: string;
}

export default function FranchiseeForm({ states }: { states: State[] }) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitFranchiseeEnquiry(formData);
      if (result?.errors) {
        setErrors(result.errors);
        toast.error(result.message);
      } else {
        toast.success("Enquiry submitted successfully!");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Institute Name *</label>
          <input
            name="franchisee_name"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
            placeholder="e.g. Dream Academy"
          />
          {errors.franchisee_name && <p className="text-red-500 text-xs mt-1">{errors.franchisee_name[0]}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Your Name *</label>
          <input
            name="contact_person"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
            placeholder="e.g. John Doe"
          />
          {errors.contact_person && <p className="text-red-500 text-xs mt-1">{errors.contact_person[0]}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Present Address *</label>
        <textarea
          name="address"
          required
          rows={2}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none resize-none"
          placeholder="Complete street address"
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address[0]}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">State *</label>
          <select
            name="state_name"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          >
            <option value="">Select State</option>
            {states.map((s: any) => (
              <option key={s.state_name} value={s.state_name}>{s.state_name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">District *</label>
          <input
            name="district"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
            placeholder="e.g. Kolkata"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">PIN *</label>
          <input
            name="pin"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
            placeholder="6 digits"
            maxLength={6}
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Mobile *</label>
          <input
            name="mobile"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
            placeholder="10 digit number"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email *</label>
        <input
          name="email"
          type="email"
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          placeholder="your@email.com"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">How Did You Know WBCA? *</label>
        <select
          name="know_wbca"
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
        >
          <option value="">Select Option</option>
          <option value="Online Ads">Online Ads/Mailers</option>
          <option value="Newspaper">Newspaper</option>
          <option value="Student Referral">Student Referral</option>
          <option value="Search Engine">Search Engine</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <input type="hidden" name="country" value="India" />

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all disabled:bg-slate-300 disabled:shadow-none mt-4 group flex items-center justify-center space-x-2"
      >
        <span>{isPending ? "Submitting..." : "Submit Enquiry"}</span>
        {!isPending && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
      </button>
    </form>
  );
}
