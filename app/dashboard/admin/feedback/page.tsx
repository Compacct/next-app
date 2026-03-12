import prisma from "@/lib/db";
import { 
  MessageSquare, 
  Search,
  Mail,
  Phone,
  Calendar,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  User,
  Quote
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { feedback } from "@prisma/client";

export default async function AdminFeedbackPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  const feedbackList = await prisma.feedback.findMany({
    orderBy: { date_posted: "desc" },
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Feedback</h1>
          <p className="text-gray-500 mt-2">Monitor messages and testimonials submitted through the website.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
            <Quote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Total Entries</p>
            <p className="text-2xl font-bold text-gray-900">{feedbackList.length}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {feedbackList.map((fb: feedback) => (
          <div key={fb.feedback_id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 group relative overflow-hidden transition-all hover:bg-slate-50/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:scale-150 duration-700" />
            
            <div className="flex flex-col md:flex-row gap-8 relative z-10">
               <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-200">
                     {fb.fb_name.charAt(0).toUpperCase()}
                  </div>
               </div>
               
               <div className="flex-grow space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">{fb.fb_name}</h3>
                        <div className="flex flex-wrap items-center gap-4 mt-1 text-slate-400 font-medium text-sm text-[13px]">
                           <div className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5" />
                              <span>{fb.fb_email}</span>
                           </div>
                           <div className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5" />
                              <span>{fb.fb_mobile}</span>
                           </div>
                           <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{fb.date_posted.toLocaleDateString()}</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <button className="p-3 bg-white text-slate-400 hover:text-red-600 rounded-2xl shadow-sm border border-slate-50 transition-all hover:shadow-md">
                           <Trash2 className="w-5 h-5" />
                        </button>
                     </div>
                  </div>
                  
                  <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 italic text-slate-600 text-[15px] leading-relaxed relative">
                     <Quote className="absolute top-4 left-4 w-12 h-12 text-slate-100 -z-10" />
                     "{fb.fb_comments}"
                  </div>
               </div>
            </div>
          </div>
        ))}

        {feedbackList.length === 0 && (
           <div className="py-20 text-center opacity-20">
              <MessageSquare className="w-16 h-16 mx-auto mb-4" />
              <p className="text-2xl font-black uppercase tracking-[0.2em]">Zero Submissions</p>
           </div>
        )}
      </div>
    </div>
  );
}
