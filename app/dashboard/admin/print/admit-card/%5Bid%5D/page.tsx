import prisma from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Printer, ChevronLeft, MapPin, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

export default async function PrintAdmitCardPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const student = await prisma.wbca_enrollment.findUnique({
    where: { enrollment_id: parseInt(params.id) },
  });

  if (!student) notFound();

  return (
    <div className="min-h-screen bg-slate-50 p-12 print:p-0 print:bg-white text-slate-900 font-sans">
      {/* UI Controls */}
      <div className="max-w-4xl mx-auto mb-12 flex items-center justify-between print:hidden">
        <Link href="/dashboard/admin/enrollments-confirmed" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-all">
          <ChevronLeft className="w-5 h-5" /> Back to List
        </Link>
        <button 
          onClick={() => window.print()} 
          className="bg-rose-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-rose-200 hover:bg-rose-700 transition-all"
        >
          <Printer className="w-5 h-5" /> Print Admit Card
        </button>
      </div>

      <div className="flex justify-center">
        <div className="w-[800px] bg-white border-2 border-slate-900 p-12 relative shadow-2xl print:shadow-none print:border-slate-800">
           {/* Header */}
           <div className="flex flex-col items-center text-center pb-8 border-b-2 border-slate-900 mb-8">
              <h1 className="text-4xl font-black uppercase italic tracking-tighter">WBCA</h1>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-slate-500 mt-1">Examination Admission Ticket</p>
              <div className="mt-4 px-6 py-2 bg-slate-900 text-white text-sm font-black uppercase tracking-widest rounded-full">
                 Provisonal Admit Card
              </div>
           </div>

           <div className="grid grid-cols-12 gap-8 mb-12">
              <div className="col-span-8 space-y-6">
                 {[
                   { label: "Candidate Name", value: student.enrollment_name },
                   { label: "Father's Name", value: student.fathers_name },
                   { label: "Enrollment No", value: student.enrollment_no },
                   { label: "Course Applied", value: student.course_name },
                   { label: "Examination Session", value: student.session },
                 ].map((item: { label: string; value: string | null }) => (
                   <div key={item.label} className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{item.label}</span>
                      <span className="text-lg font-bold text-slate-800 uppercase mt-1">{item.value}</span>
                   </div>
                 ))}
              </div>
              <div className="col-span-4 flex flex-col items-center gap-4">
                 <div className="w-40 h-48 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center justify-center text-slate-200 relative overflow-hidden">
                    <User className="w-16 h-16 opacity-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-20 rotate-12">Affix Photo Here</span>
                    </div>
                 </div>
                 <div className="w-40 h-12 bg-slate-50 border border-slate-200 rounded-xl flex items-end justify-center pb-1">
                    <span className="text-[8px] font-bold text-slate-300 uppercase">Student Signature</span>
                 </div>
              </div>
           </div>

           {/* Exam Center Info */}
           <div className="grid grid-cols-2 gap-8 p-8 bg-slate-50 rounded-3xl border border-slate-100 mb-12">
              <div className="flex items-start gap-3">
                 <MapPin className="w-5 h-5 text-rose-600 mt-1" />
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Examination Venue</span>
                    <p className="text-sm font-bold text-slate-700 leading-tight mt-1">
                       As allotted in Center Code: <span className="text-rose-600 font-black">{student.franchisee_code}</span><br/>
                       Refer to your nearest authorized WBCA study center.
                    </p>
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Schedule Info</span>
                    <p className="text-sm font-bold text-slate-700 mt-1 italic">
                       Please refer to notification section on web for detailed timetable.
                    </p>
                 </div>
              </div>
           </div>

           {/* Important Instructions */}
           <div className="border-t-2 border-slate-100 pt-8">
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Important Instructions</h3>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-[9px] font-medium text-slate-500 leading-snug list-disc pl-4">
                 <li>Candidate must carry this Admit Card to the exam hall.</li>
                 <li>Entry without valid ID Proof and Admit Card is prohibited.</li>
                 <li>Report to the center 30 minutes before commencement.</li>
                 <li>Electronic gadgets including mobile phones are not allowed.</li>
                 <li>Use of unfair means will lead to immediate cancellation.</li>
                 <li>Refer to student handbook for detailed exam policies.</li>
              </ul>
           </div>

           {/* Authenticator Seal */}
           <div className="mt-12 flex justify-end px-4">
              <div className="flex flex-col items-center">
                 <div className="w-32 h-16 bg-slate-900/5 rounded-2xl flex items-center justify-center border border-slate-100 mb-2">
                    <span className="text-[10px] font-black text-slate-300 uppercase -rotate-12">Digital Seal</span>
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Controller of Exams</span>
              </div>
           </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; }
          .min-h-screen { padding: 0 !important; }
          @page { size: auto; margin: 0; }
        }
      `}} />
    </div>
  );
}
