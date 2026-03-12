"use client";

import { useTransition } from "react";
import { createEnrollment } from "../actions";
import { toast } from "react-hot-toast";
import { User, Phone, Mail, MapPin, Calendar, BookOpen, Clock, ChevronRight, Save } from "lucide-react";

export default function EnrollmentForm({ courses, sessions, states }: any) {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createEnrollment(formData);
      if (result?.error) {
        if (typeof result.error === 'string') {
           toast.error(result.error);
        } else {
           toast.error("Please fix the errors in the form.");
        }
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8 pb-20">
      
      {/* Step 1: Course & Session */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
           </div>
           <div>
              <h3 className="text-xl font-bold text-gray-900">Program Details</h3>
              <p className="text-sm text-slate-400 font-medium">Select the course and session for enrollment</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Select Course *</label>
            <select name="course_id" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium">
              <option value="">Choose a course</option>
              {courses.map((c: any) => (
                <option key={c.course_id} value={c.course_id}>{c.course_name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Academic Session *</label>
            <select name="session_id" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium">
              <option value="">Choose a session</option>
              {sessions.map((s: any) => (
                <option key={s.session_id} value={s.session_id}>{s.session}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Date of Admission *</label>
            <input type="date" name="date_admission" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium" />
          </div>
        </div>
      </div>

      {/* Step 2: Personal Details */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-indigo-600" />
           </div>
           <div>
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
              <p className="text-sm text-slate-400 font-medium">Enter the student's legal details</p>
           </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Applicant Name *</label>
            <input name="enrollment_name" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium" placeholder="Full legal name" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Father's Name *</label>
              <input name="fathers_name" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Mother's Name *</label>
              <input name="mothers_name" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">DOB - Day</label>
                <select name="dob_day" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none">
                   {Array.from({length: 31}, (_, i) => i + 1).map(d => (
                     <option key={d} value={d.toString().padStart(2, '0')}>{d.toString().padStart(2, '0')}</option>
                   ))}
                </select>
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">DOB - Month</label>
                <select name="dob_month" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none">
                   {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                     <option key={m} value={(i + 1).toString().padStart(2, '0')}>{m}</option>
                   ))}
                </select>
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">DOB - Year</label>
                <select name="dob_year" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none">
                   {Array.from({length: 101}, (_, i) => 2050 - i).map(y => (
                     <option key={y} value={y.toString()}>{y}</option>
                   ))}
                </select>
             </div>
          </div>

          <div className="space-y-1">
             <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Gender *</label>
             <div className="flex gap-4">
                {['Male', 'Female', 'Transgender'].map(g => (
                   <label key={g} className="flex-1">
                      <input type="radio" name="sex" value={g} className="hidden peer" defaultChecked={g === 'Male'} />
                      <div className="text-center py-3 rounded-2xl border border-slate-100 bg-slate-50 cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 transition-all font-bold text-sm">
                         {g}
                      </div>
                   </label>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Step 3: Contact & Address */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-emerald-600" />
           </div>
           <div>
              <h3 className="text-xl font-bold text-gray-900">Communication</h3>
              <p className="text-sm text-slate-400 font-medium">Where can we reach the student?</p>
           </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Address *</label>
            <textarea name="address" required rows={3} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium resize-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">District *</label>
                <input name="district" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">State *</label>
                <select name="state" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-medium">
                  {states.map((s: any) => (
                    <option key={s.state_name} value={s.state_name}>{s.state_name}</option>
                  ))}
                </select>
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">PIN Code *</label>
                <input name="pin" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Contact No (Mobile) *</label>
                <input name="contact_no" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-medium" placeholder="10 digit number" />
             </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address *</label>
            <input name="email" type="email" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-medium" placeholder="student@email.com" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
         <button type="button" onClick={() => window.history.back()} className="px-8 py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors">Cancel</button>
         <button 
           type="submit" 
           disabled={isPending}
           className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-2xl transform hover:-translate-y-1 transition-all disabled:opacity-50"
         >
           {isPending ? <Clock className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
           <span>{isPending ? "Submitting..." : "Submit Enrollment"}</span>
         </button>
      </div>

    </form>
  );
}
