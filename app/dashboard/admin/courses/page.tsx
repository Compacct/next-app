import prisma from "@/lib/db";
import { 
  Building2, 
  Plus, 
  BookOpen, 
  LayoutGrid, 
  Trash2, 
  Edit3,
  Search,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { wbca_category, wbca_course } from "@prisma/client";

export default async function AdminCoursesPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  const courses = await prisma.wbca_course.findMany({
    orderBy: { course_id: "desc" },
  });

  const categories = await prisma.wbca_category.findMany({
    orderBy: { category_id: "desc" },
  });

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Curriculum Management</h1>
          <p className="text-gray-500 mt-2">Manage educational categories, courses, and syllabus details.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" /> New Category
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200">
            <Plus className="w-5 h-5" /> Add Course
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-blue-600" /> Categories
              </h2>
              <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-500">
                {categories.length}
              </span>
            </div>
            <div className="divide-y divide-slate-50">
              {categories.map((cat: wbca_category) => (
                <div key={cat.category_id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                  <span className="font-bold text-slate-600 text-sm">{cat.category_name}</span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl">
             <BookOpen className="w-10 h-10 mb-6 text-white/40" />
             <h3 className="text-xl font-bold mb-2">Need to Import?</h3>
             <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
               You can bulk import courses and semester data using our Excel template.
             </p>
             <button className="w-full bg-white text-indigo-700 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all text-sm">
                Get Template
             </button>
          </div>
        </div>

        {/* Courses Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
               <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Find a course..."
                   className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                 />
               </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Abbr / Code</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Course Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Eligibility</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Dur.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses.map((course: wbca_course) => (
                    <tr key={course.course_id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                      <td className="px-6 py-5">
                         <div className="flex flex-col">
                           <span className="font-black text-blue-600 text-xs">{course.abbreviation}</span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">{course.course_code}</span>
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors uppercase">{course.course_name}</p>
                         <p className="text-[10px] font-bold text-slate-400 mt-1">{course.category_name}</p>
                      </td>
                      <td className="px-6 py-5">
                         <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500 uppercase">
                           {course.eligibility}
                         </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                         <span className="font-black text-slate-900 text-sm">{course.duration}M</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
