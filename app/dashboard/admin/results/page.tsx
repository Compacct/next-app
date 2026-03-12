import prisma from "@/lib/db";
import { 
  GraduationCap, 
  Search,
  CheckCircle,
  FileText,
  Download,
  Filter,
  Users,
  Award,
  Clock
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { wbca_enrollment } from "@prisma/client";
import Link from "next/link";

export default async function AdminResultsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  // Fetch only confirmed students who are eligible for results
  const confirmedStudents = await prisma.wbca_enrollment.findMany({
    where: { enrollment_status: "Confirm" },
    orderBy: { enrollment_no: "desc" },
    take: 100
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Result Management</h1>
          <p className="text-gray-500 mt-2">Process marks, generate transcripts, and publish final results.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
            <Download className="w-5 h-5" /> Export Results
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Eligible Students", value: confirmedStudents.length, icon: Users, color: "blue" },
          { label: "Results Issued", value: confirmedStudents.filter((s: wbca_enrollment) => s.result_issue_date && s.result_issue_date.getFullYear() > 1970).length, icon: Award, color: "green" },
          { label: "Pending Marks", value: confirmedStudents.filter((s: wbca_enrollment) => !s.result_issue_date || s.result_issue_date.getFullYear() <= 1970).length, icon: Clock, color: "amber" },
          { label: "Published on Web", value: confirmedStudents.filter((s: wbca_enrollment) => s.published === "Y").length, icon: CheckCircle, color: "indigo" },
        ].map((stat: { label: string; value: number; icon: any; color: string }) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 bg-${stat.color}-50 rounded-2xl flex items-center justify-center text-${stat.color}-600`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900 leading-none mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-grow max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by student name or enrollment number..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
             <button className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
                <Filter className="w-5 h-5" />
             </button>
             <button className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Bulk Process
             </button>
          </div>
        </div>

        <div className="overflow-x-auto text-sm">
          <table className="w-full text-left font-medium">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Enr. No</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student Info</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Course & Session</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Issue Date</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {confirmedStudents.map((enr: wbca_enrollment) => (
                <tr key={enr.enrollment_id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5 text-center">
                    <span className="font-black text-blue-600 tracking-tighter uppercase">{enr.enrollment_no}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors capitalize">{enr.enrollment_name}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-tighter">FRA: {enr.franchisee_code}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-slate-600 text-[13px] font-bold truncate max-w-[200px] uppercase">{enr.course_name}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{enr.session}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    {enr.result_issue_date && enr.result_issue_date.getFullYear() > 1970 ? (
                      <span className="text-green-600 font-bold">{enr.result_issue_date.toLocaleDateString()}</span>
                    ) : (
                      <span className="text-amber-500 font-bold italic">Not Issued</span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/admin/print/marksheet/${enr.enrollment_id}`} className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-all text-[10px] uppercase">
                        <FileText className="w-3 h-3" /> Marks
                      </Link>
                      <Link href={`/dashboard/admin/print/certificate/${enr.enrollment_id}`} className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all text-[10px] uppercase">
                        <Award className="w-3 h-3" /> Cert
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
