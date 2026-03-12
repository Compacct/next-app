import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Search, UserPlus, Eye, Smartphone, MoreVertical, LayoutGrid, List } from "lucide-react";
import Link from "next/link";

export default async function EnrollmentPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const session = await getServerSession(authOptions);
  const franchiseeCode = (session?.user as any)?.code;

  if (!franchiseeCode) {
    return <div>Access Denied. Please log in as a Franchisee.</div>;
  }

  const query = searchParams.q || "";

  const enrollments = await prisma.wbca_enrollment.findMany({
    where: {
      franchisee_code: franchiseeCode,
      OR: [
        { enrollment_name: { contains: query } },
        { enrollment_no: { contains: query } },
      ],
    },
    orderBy: { enrollment_no: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Student Enrollments</h1>
          <p className="text-slate-500 mt-1">Manage and track your students admission status.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
          <UserPlus className="w-5 h-5" />
          <span>New Enrollment</span>
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <form action="/dashboard/franchisee/enrollments">
                 <input
                   name="q"
                   defaultValue={query}
                   placeholder="Search by name or number..."
                   className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-sm"
                 />
              </form>
           </div>
           <div className="flex items-center gap-2">
              <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><List className="w-5 h-5" /></button>
              <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl"><LayoutGrid className="w-5 h-5" /></button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-5">Enrollment No</th>
                <th className="px-8 py-5">Student Details</th>
                <th className="px-8 py-5">Course</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {enrollments.map((en: any) => (
                <tr key={en.enrollment_id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="font-bold text-gray-900">{en.enrollment_no}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                          {en.enrollment_name.charAt(0)}
                       </div>
                       <div>
                          <p className="font-bold text-gray-900 leading-none">{en.enrollment_name}</p>
                          <p className="text-xs text-slate-400 mt-1">{en.fathers_name}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="max-w-[180px]">
                      <p className="font-semibold text-gray-700 text-sm truncate">{en.course_name}</p>
                      <p className="text-[10px] font-bold text-blue-500 uppercase mt-1">{en.session}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                      en.enrollment_status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                    }`}>
                      {en.enrollment_status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Eye className="w-4 h-4" />
                       </button>
                       <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreVertical className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {enrollments.length === 0 && (
          <div className="p-20 text-center">
             <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Search className="w-8 h-8" />
             </div>
             <p className="font-bold text-slate-700">No students found</p>
             <p className="text-sm text-slate-400">Try searching for another student or enrollment number.</p>
          </div>
        )}
      </div>
    </div>
  );
}
