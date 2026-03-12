import prisma from "@/lib/db";
import { 
  Users, 
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Edit3,
  Trash2,
  Eye
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { wbca_enrollment } from "@prisma/client";

export default async function AdminPendingEnrollmentsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  const pendingEnrollments = await prisma.wbca_enrollment.findMany({
    where: { enrollment_status: "Pending" },
    orderBy: { date_admission: "desc" },
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pending Enrollments</h1>
          <p className="text-gray-500 mt-2">Verify payments and vet new student registrations.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or center code..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto text-sm">
          <table className="w-full text-left font-medium">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student Info</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Course & Session</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Payment Info</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingEnrollments.length === 0 ? (
                 <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                       <div className="flex flex-col items-center opacity-20">
                          <Users className="w-16 h-16 mb-4" />
                          <p className="text-xl font-black uppercase">No Pending Records</p>
                       </div>
                    </td>
                 </tr>
              ) : (
                pendingEnrollments.map((enr: wbca_enrollment) => (
                  <tr key={enr.enrollment_id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col text-sm">
                        <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase">{enr.enrollment_name}</span>
                        <div className="flex items-center gap-2 mt-1">
                           <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-1.5 py-0.5 rounded">FRA: {enr.franchisee_code}</span>
                           <span className="text-[10px] font-medium text-slate-400">{new Date(enr.date_admission).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-slate-600 text-[13px] font-bold truncate max-w-[200px] uppercase">{enr.course_name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{enr.session}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col items-center">
                         <div className="flex items-center gap-1.5 text-blue-600 font-black">
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>₹{enr.amount.toString()}</span>
                         </div>
                         <span className="text-[9px] font-bold text-slate-300 uppercase mt-0.5 tracking-widest">{enr.payment_mode}: {enr.payment_no}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                        <Clock className="w-3 h-3" /> Waiting Vetting
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all text-[11px] uppercase tracking-wider flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5" /> Confirm
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Eye className="w-4.5 h-4.5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
