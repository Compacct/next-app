import prisma from "@/lib/db";
import { 
  Plus, 
  Search,
  Edit3,
  Trash2,
  BookOpen,
  LayoutGrid,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { wbca_subject, wbca_course } from "@prisma/client";

export default async function AdminSubjectsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  const subjects = await prisma.wbca_subject.findMany({
    orderBy: { subject_id: "desc" },
  });

  const courses = await prisma.wbca_course.findMany({
    orderBy: { course_name: "asc" },
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subject Management</h1>
          <p className="text-gray-500 mt-2">Map academic subjects and mark distributions to courses.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200">
          <Plus className="w-5 h-5" /> Define New Subject
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search subjects..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-medium">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Subject Name</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Semester / Order</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Marks (Int / Thy)</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjects.map((subj: wbca_subject) => {
                const course = courses.find((c: wbca_course) => c.course_id === subj.course_id);
                return (
                  <tr key={subj.subject_id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors uppercase">{subj.subject_name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Course: {course?.course_name || `ID: ${subj.course_id}`}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 uppercase">
                        S{subj.semester_id} | Order {subj.subj_order}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                       <div className="flex items-center justify-center gap-2">
                         <span className="text-blue-600 font-black">{subj.internal_mm}</span>
                         <span className="text-slate-300">/</span>
                         <span className="text-slate-900 font-black">{subj.theory_mm}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5 text-right">
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
