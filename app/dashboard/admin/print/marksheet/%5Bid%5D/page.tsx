import prisma from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Printer, ChevronLeft, FileText } from "lucide-react";
import Link from "next/link";
import { wbca_subject } from "@prisma/client";

export default async function PrintMarksheetPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const student = await prisma.wbca_enrollment.findUnique({
    where: { enrollment_id: parseInt(params.id) },
  });

  if (!student) notFound();

  // Get course_id from wbca_course using course_code
  const course = await prisma.wbca_course.findFirst({
    where: { course_code: student.course_code }
  });

  // Fetch subjects for this course to display in marksheet
  const subjects = course ? await prisma.wbca_subject.findMany({
    where: { course_id: course.course_id },
    orderBy: { subj_order: "asc" },
  }) : [];

  return (
    <div className="min-h-screen bg-slate-50 p-12 print:p-0 print:bg-white text-slate-900 font-sans">
      {/* UI Controls */}
      <div className="max-w-5xl mx-auto mb-12 flex items-center justify-between print:hidden">
        <Link href="/dashboard/admin/results" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-all">
          <ChevronLeft className="w-5 h-5" /> Back to Results
        </Link>
        <button 
          onClick={() => window.print()} 
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-slate-200 hover:bg-black transition-all"
        >
          <Printer className="w-5 h-5" /> Print Marksheet
        </button>
      </div>

      <div className="flex justify-center">
        <div className="w-[850px] min-h-[1100px] bg-white border border-slate-200 p-16 relative shadow-2xl print:shadow-none print:border-slate-300">
           {/* Watermark (Mockup) */}
           <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <h1 className="text-[12rem] font-black uppercase rotate-45 tracking-widest">WBCA</h1>
           </div>

           <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-start mb-12">
                 <div className="flex flex-col">
                    <h1 className="text-4xl font-black tracking-tighter italic">WBCA</h1>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Academic Affairs Division</span>
                 </div>
                 <div className="text-right">
                    <h2 className="text-xl font-black uppercase tracking-tight">Statement of Marks</h2>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Official Transcript</span>
                 </div>
              </div>

              {/* Student Header */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-6 py-8 border-y-2 border-slate-900 mb-12">
                 {[
                   { label: "Name of Candidate", value: student.enrollment_name },
                   { label: "Father's Name", value: student.fathers_name },
                   { label: "Enrollment Number", value: student.enrollment_no },
                   { label: "Name of Course", value: student.course_name },
                   { label: "Center Code", value: student.franchisee_code },
                   { label: "Academic Session", value: student.session },
                 ].map((item: { label: string; value: string | null }) => (
                   <div key={item.label} className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{item.label}</span>
                      <span className="text-sm font-bold text-slate-800 uppercase truncate">{item.value}</span>
                   </div>
                 ))}
              </div>

              {/* Marks Table */}
              <table className="w-full border-collapse mb-12">
                 <thead>
                    <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                       <th className="p-4 text-left border border-slate-900">Subject Code & Title</th>
                       <th className="p-4 text-center border border-slate-900">Internal (MM)</th>
                       <th className="p-4 text-center border border-slate-900">Theory (MM)</th>
                       <th className="p-4 text-center border border-slate-900">Marks Obtained</th>
                    </tr>
                 </thead>
                 <tbody className="text-sm font-bold text-slate-700">
                    {subjects.map((subj: wbca_subject) => (
                       <tr key={subj.subject_id}>
                          <td className="p-4 border border-slate-200 uppercase">{subj.subject_name}</td>
                          <td className="p-4 border border-slate-200 text-center">{subj.internal_mm}</td>
                          <td className="p-4 border border-slate-200 text-center">{subj.theory_mm}</td>
                          <td className="p-4 border border-slate-200 text-center font-black text-slate-900 italic">--</td>
                       </tr>
                    ))}
                    {/* Empty rows to fill space */}
                    {Array.from({ length: Math.max(0, 8 - subjects.length) }).map((_: unknown, i: number) => (
                       <tr key={`empty-${i}`}>
                          <td className="p-6 border border-slate-100" />
                          <td className="p-6 border border-slate-100" />
                          <td className="p-6 border border-slate-100" />
                          <td className="p-6 border border-slate-100" />
                       </tr>
                    ))}
                 </tbody>
                 <tfoot>
                    <tr className="bg-slate-50 font-black">
                       <td className="p-4 border border-slate-200 text-right uppercase tracking-widest text-[10px]">Grand Total</td>
                       <td className="p-4 border border-slate-200 text-center">--</td>
                       <td className="p-4 border border-slate-200 text-center">--</td>
                       <td className="p-4 border border-slate-200 text-center text-lg italic">PENDING</td>
                    </tr>
                 </tfoot>
              </table>

              {/* Footer / Notes */}
              <div className="mt-auto grid grid-cols-2 gap-20 items-end px-4">
                 <div className="space-y-4">
                    <div className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed max-w-xs">
                       Note: This is a computer generated statement of marks. In case of any discrepancy, Please report to the Controller of Examinations.
                    </div>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="w-full h-1 bg-slate-100 mb-2" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Controller of Examinations</span>
                 </div>
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
