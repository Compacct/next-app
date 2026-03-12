import prisma from "@/lib/db";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Download
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { news } from "@prisma/client";

export default async function AdminNewsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  const newsList = await prisma.news.findMany({
    orderBy: { date_updated: "desc" },
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News & Notices</h1>
          <p className="text-gray-500 mt-2">Manage official announcements and downloadable notices.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200">
          <Plus className="w-5 h-5" /> Add New Notice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Total Notices</p>
            <p className="text-2xl font-bold text-gray-900">{newsList.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Published</p>
            <p className="text-2xl font-bold text-gray-900">
              {newsList.filter((n: news) => n.published === "Y").length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search news..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-medium">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Notice Title</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Type</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Last Updated</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {newsList.map((n: news) => (
                <tr key={n.doc_id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="font-bold text-slate-700 capitalize group-hover:text-blue-600 transition-colors">{n.document_name}</span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-400 uppercase">
                      {n.mimetype}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-400">
                    {n.date_updated ? new Date(n.date_updated).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-8 py-5">
                    {n.published === "Y" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle className="w-3 h-3" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                        <XCircle className="w-3 h-3" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <button className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Download Source">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit">
                        <Edit3 className="w-4 h-4" />
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
