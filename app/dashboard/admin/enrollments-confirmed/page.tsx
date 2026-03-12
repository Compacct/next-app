import prisma from "@/lib/db";
import { 
  Users, 
  Search,
  CheckCircle,
  XCircle,
  CreditCard,
  Edit3,
  Trash2,
  Eye,
  CreditCard as CardIcon,
  Globe,
  Printer
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { wbca_enrollment } from "@prisma/client";
import Link from "next/link";

export default async function AdminConfirmedEnrollmentsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  const confirmedEnrollments = await prisma.wbca_enrollment.findMany({
    where: { enrollment_status: "Confirm" },
    orderBy: { enrollment_no: "desc" },
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Confirmed Enrollments</h1>
          <p className="text-gray-500 mt-2">Manage active student records, ID cards, and web publishing.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by enrollment no or name..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto text-sm">
          <table className="w-full text-left font-medium">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Enr. No</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student Info</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Course & Session</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Web PUB</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {confirmedEnrollments.map((enr: wbca_enrollment) => (
                <tr key={enr.enrollment_id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 text-center">
                    <span className="font-black text-blue-600 tracking-tighter uppercase">{enr.enrollment_no}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors capitalize">{enr.enrollment_name}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                         <span className="text-[10px] font-bold text-slate-400 uppercase">FRA: {enr.franchisee_code}</span>
                         <span className="text-[10px] font-medium text-slate-300">|</span>
                         <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">DOB: {new Date(enr.dob).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-slate-600 text-[13px] font-bold truncate max-w-[200px] uppercase">{enr.course_name}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{enr.session}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    {enr.published === "Y" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[9px] font-black uppercase tracking-widest">
                        <Globe className="w-2.5 h-2.5" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-400 text-[9px] font-black uppercase tracking-widest">
                        <XCircle className="w-2.5 h-2.5" /> Hidden
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                       <Link href={`/dashboard/admin/print/id-card/${enr.enrollment_id}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all text-[10px] uppercase tracking-wider" title="Print ID Card">
                          <Printer className="w-3.5 h-3.5" /> ID Card
                       </Link>
                       <Link href={`/dashboard/admin/print/admit-card/${enr.enrollment_id}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-600 hover:text-white transition-all text-[10px] uppercase tracking-wider" title="Print Admit Card">
                          <Printer className="w-3.5 h-3.5" /> Admit
                       </Link>
                       <button className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="View Info">
                          <Eye className="w-4 h-4" />
                       </button>
                       <button className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit Record">
                          <Edit3 className="w-4 h-4" />
                       </button>
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
