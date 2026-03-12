import prisma from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Printer, Download, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function PrintIDCardPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const student = await prisma.wbca_enrollment.findUnique({
    where: { enrollment_id: parseInt(params.id) },
  });

  if (!student) notFound();

  return (
    <div className="min-h-screen bg-slate-50 p-8 print:p-0 print:bg-white">
      {/* UI Controls - Hidden on Print */}
      <div className="max-w-4xl mx-auto mb-12 flex items-center justify-between print:hidden">
        <Link href="/dashboard/admin/enrollments-confirmed" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-all">
          <ChevronLeft className="w-5 h-5" /> Back to List
        </Link>
        <button 
          onClick={() => window.print()} 
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all"
        >
          <Printer className="w-5 h-5" /> Print Now
        </button>
      </div>

      {/* ID Card Container */}
      <div className="flex justify-center">
        <div className="w-[330px] h-[520px] bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative print:shadow-none print:border-slate-200">
           {/* Header */}
           <div className="bg-slate-900 h-24 flex flex-col items-center justify-center text-white relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              <h2 className="text-xl font-black tracking-tighter uppercase italic">WBCA</h2>
              <span className="text-[8px] font-bold text-slate-400 tracking-[0.3em] uppercase">Academic Identity Card</span>
           </div>

           {/* Profile Section */}
           <div className="px-6 -mt-10 flex flex-col items-center flex-grow">
              <div className="w-32 h-32 bg-slate-100 rounded-[1.5rem] border-4 border-white shadow-xl overflow-hidden relative mb-6">
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <h1 className="text-4xl font-black uppercase tracking-widest rotate-12">PHOTO</h1>
                 </div>
              </div>

              <div className="text-center mb-8">
                 <h3 className="text-xl font-black text-slate-800 uppercase leading-none mb-1">{student.enrollment_name}</h3>
                 <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{student.course_name}</span>
              </div>

              <div className="w-full space-y-4">
                 {[
                   { label: "Enrollment No", value: student.enrollment_no },
                   { label: "Session", value: student.session },
                   { label: "Date of Birth", value: student.dob ? new Date(student.dob).toLocaleDateString() : "-" },
                   { label: "Center Code", value: student.franchisee_code },
                 ].map((row: { label: string; value: string | null }) => (
                   <div key={row.label} className="flex flex-col border-b border-slate-50 pb-2">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">{row.label}</span>
                      <span className="text-sm font-bold text-slate-700 uppercase mt-0.5">{row.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Footer */}
           <div className="p-6 bg-slate-50 flex flex-col items-center border-t border-slate-100">
              <div className="w-full h-8 flex items-center justify-between">
                 <div className="flex flex-col">
                    <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Digital Auth</span>
                    <span className="text-[10px] font-black text-slate-800 tracking-tighter">WBCA-PRT-V1</span>
                 </div>
                 <div className="w-16 h-8 bg-slate-900/5 rounded flex items-center justify-center">
                    <span className="text-[8px] font-black text-slate-300 uppercase -rotate-12">Signature</span>
                 </div>
              </div>
              <p className="text-[7.5px] font-bold text-slate-400 text-center mt-4 uppercase leading-tight tracking-tighter">
                 This card remains property of WBCA. If found, please return to any authorized center or head office.
              </p>
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
