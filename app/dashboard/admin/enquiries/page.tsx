import prisma from "@/lib/db";
import { 
  Users, 
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { franchisee_enquiry } from "@prisma/client";

export default async function AdminEnquiriesPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  const enquiries = await prisma.franchisee_enquiry.findMany({
    orderBy: { date_updated: "desc" },
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Franchisee Enquiries</h1>
          <p className="text-gray-500 mt-2">Manage prospective center leads and enquiry submissions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Total Enquiries</p>
            <p className="text-2xl font-bold text-gray-900">{enquiries.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search enquiries..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-medium">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Prospect Name</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Contact Info</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Location</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enquiries.map((enq: franchisee_enquiry) => (
                <tr key={enq.franchisee_enquiry_id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors capitalize">{enq.franchisee_name}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-tighter">Person: {enq.contact_person}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                       <div className="flex items-center gap-2 text-slate-600 text-[13px]">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{enq.email}</span>
                       </div>
                       <div className="flex items-center gap-2 text-slate-600 text-[13px]">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{enq.mobile}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[13px] text-slate-600 capitalize">
                       <MapPin className="w-4 h-4 text-slate-400" />
                       <span>{enq.district}, {enq.state_name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-400">
                    {new Date(enq.date_updated).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                       <button className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="View Detail">
                          <ExternalLink className="w-4 h-4" />
                       </button>
                       <button className="p-2 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Delete">
                          <Trash2 className="w-4 h-4" />
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
