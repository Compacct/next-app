import prisma from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Printer, ChevronLeft, Award } from "lucide-react";
import Link from "next/link";

export default async function PrintCertificatePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const student = await prisma.wbca_enrollment.findUnique({
    where: { enrollment_id: parseInt(params.id) },
  });

  if (!student) notFound();

  // Assuming result_issue_date is the certificate date
  const certDate = student.result_issue_date && student.result_issue_date.getFullYear() > 1970 
    ? student.result_issue_date 
    : new Date();

  return (
    <div className="min-h-screen bg-slate-50 p-12 print:p-0 print:bg-white text-slate-800 font-serif">
      {/* UI Controls - Hidden on Print */}
      <div className="max-w-5xl mx-auto mb-12 flex items-center justify-between print:hidden font-sans">
        <Link href="/dashboard/admin/results" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-all">
          <ChevronLeft className="w-5 h-5" /> Back to Results
        </Link>
        <button 
          onClick={() => window.print()} 
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all font-sans"
        >
          <Printer className="w-5 h-5" /> Print Certificate
        </button>
      </div>

      {/* Certificate Container - Landscape A4 aspect */}
      <div className="flex justify-center">
        <div className="w-[1100px] h-[780px] bg-white border-[16px] border-double border-slate-900 p-16 relative shadow-2xl print:shadow-none print:border-slate-800">
           {/* Decorative Corner Ornaments (Mockup) */}
           <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-slate-400" />
           <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-slate-400" />
           <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-slate-400" />
           <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-slate-400" />

           <div className="h-full border border-slate-100 p-12 flex flex-col items-center">
              {/* Institutional Header */}
              <div className="text-center mb-12">
                 <h1 className="text-6xl font-black tracking-tight text-slate-900 mb-2 uppercase italic font-sans">WBCA</h1>
                 <p className="text-sm font-bold tracking-[0.4em] uppercase text-slate-500 font-sans">National Council for Vocational & Skill Development</p>
                 <div className="w-32 h-1 bg-slate-900 mx-auto mt-6" />
              </div>

              {/* Certificate Title */}
              <div className="text-center mb-12">
                 <h2 className="text-4xl font-light italic mb-2">This is to certify that</h2>
                 <h3 className="text-5xl font-black text-slate-900 underline decoration-slate-200 underline-offset-8 decoration-2 uppercase">{student.enrollment_name}</h3>
              </div>

              <div className="text-center max-w-3xl space-y-6">
                 <p className="text-2xl font-light leading-relaxed">
                    Son/Daughter of <span className="font-bold border-b border-slate-200 px-4">{student.fathers_name}</span> has successfully completed the prescribed course of study in
                 </p>
                 <h4 className="text-3xl font-black text-indigo-950 uppercase py-4 px-8 bg-slate-50 rounded-2xl border border-slate-100 font-sans">
                    {student.course_name}
                 </h4>
                 <p className="text-xl font-light">
                    conducted at our authorized center <span className="font-bold">{student.franchisee_code}</span> during the session <span className="font-bold">{student.session}</span>.
                 </p>
              </div>

              {/* Grade/Result Section */}
              <div className="mt-12 flex items-center gap-12">
                 <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">Enrollment No</span>
                    <span className="text-xl font-black text-slate-800 font-sans">{student.enrollment_no}</span>
                 </div>
                 <div className="w-24 h-24 bg-slate-100 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-slate-300">
                    <Award className="w-12 h-12" />
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">Grade Awarded</span>
                    <span className="text-xl font-black text-blue-600 font-sans">EXCELLENT</span>
                 </div>
              </div>

              {/* Signatures */}
              <div className="mt-auto w-full flex justify-between items-end px-12">
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-48 h-0.5 bg-slate-200" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">Controller of Exams</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans mb-1">Issued on</span>
                    <span className="text-sm font-black text-slate-700 font-sans">{certDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-48 h-0.5 bg-slate-200" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">Chairman</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; }
          .min-h-screen { padding: 0 !important; }
          @page { size: landscape; margin: 0; }
        }
      `}} />
    </div>
  );
}
