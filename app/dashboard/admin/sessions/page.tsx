import prisma from "@/lib/db";
import { 
  Plus, 
  Clock, 
  Search,
  CheckCircle,
  XCircle,
  Calendar,
  Layers,
  Edit3,
  Trash2
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { wbca_session } from "@prisma/client";

export default async function AdminSessionsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  const sessions = await prisma.wbca_session.findMany({
    orderBy: { session_id: "desc" },
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Sessions</h1>
          <p className="text-gray-500 mt-2">Manage enrollment periods and active academic cycles.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200">
          <Plus className="w-5 h-5" /> Start New Session
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Total Sessions</p>
            <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Current Active</p>
            <p className="text-2xl font-bold text-gray-900">
              {sessions.filter((s: wbca_session) => s.published === "Y").length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-medium">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Session Name</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Period</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sessions.map((sess: wbca_session) => (
                <tr key={sess.session_id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                          <Layers className="w-5 h-5" />
                       </div>
                       <span className="font-black text-slate-800 tracking-tight uppercase">{sess.session}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {sess.period} Months
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    {sess.published === "Y" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                        <XCircle className="w-3 h-3" /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                       <button className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Edit3 className="w-4 h-4" />
                       </button>
                       <button className="p-2 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
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
