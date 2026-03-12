import prisma from "@/lib/db";
import { 
  Users, 
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download,
  Calendar,
  BookOpen
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { wbca_enrollment } from "@prisma/client";

export default async function AdminEnrollmentsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  const enrollments = await prisma.wbca_enrollment.findMany({
    orderBy: { enrollment_id: "desc" },
    take: 100, // Limit for performance in admin panel
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Enrollments</h1>
          <p className="text-gray-500 mt-2">View and manage student applications across all branches.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
          <Download className="w-5 h-5" /> Export Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Students", value: enrollments.length, icon: Users, color: "blue" },
          { label: "Approved", value: enrollments.filter((e: wbca_enrollment) => e.enrollment_status === "Approved").length, icon: CheckCircle, color: "green" },
          { label: "Pending", value: enrollments.filter((e: wbca_enrollment) => e.enrollment_status === "Pending").length, icon: Clock, color: "amber" },
          { label: "Rejected", value: enrollments.filter((e: wbca_enrollment) => e.enrollment_status === "Rejected").length, icon: XCircle, color: "red" },
        ].map((stat: { label: string; value: number; icon: any; color: string }) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 bg-${stat.color}-50 rounded-2xl flex items-center justify-center text-${stat.color}-600`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900 leading-none mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Filter & Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="relative flex-grow max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by student name, enrollment number, or franchisee code..."
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium text-slate-900"
            />
          </div>
          <div className="flex items-center gap-3">
             <button className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
                <Filter className="w-5 h-5" />
             </button>
             <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Bulk Action
             </button>
          </div>
        </div>

        <div className="overflow-x-auto text-sm text-slate-600">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px] text-slate-400">Student Record</th>
                <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px] text-slate-400">Course Info</th>
                <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px] text-slate-400">Franchisee</th>
                <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px] text-slate-400">Status</th>
                <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {enrollments.map((enr: wbca_enrollment) => (
                <tr key={enr.enrollment_id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold shrink-0">
                         {enr.enrollment_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 capitalize leading-tight">{enr.enrollment_name}</p>
                        <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">ID: {enr.enrollment_no || 'Pending'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div>
                      <p className="font-bold text-slate-700 truncate max-w-[200px]">{enr.course_name}</p>
                      <p className="text-[11px] flex items-center gap-1.5 text-slate-400 mt-1 uppercase font-bold">
                        <Calendar className="w-3 h-3" /> {new Date(enr.date_admission).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-bold text-blue-600 uppercase text-[11px] tracking-wide">
                    {enr.franchisee_code}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider
                      ${enr.enrollment_status === "Approved" ? "bg-green-100 text-green-700" : 
                        enr.enrollment_status === "Rejected" ? "bg-red-100 text-red-700" : 
                        "bg-amber-100 text-amber-700"}`}>
                      {enr.enrollment_status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all text-[11px] uppercase tracking-wider">
                      Review
                    </button>
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
