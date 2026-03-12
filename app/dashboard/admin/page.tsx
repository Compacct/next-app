import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Users, Building2, BookOpen, Clock, ArrowUpRight, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
     return <div>Access Denied</div>;
  }

  // Stats
  const totalStudents = await prisma.wbca_enrollment.count();
  const totalFranchisee = await prisma.wbca_franchisee.count();
  const totalCourses = await prisma.wbca_course.count();

  const stats = [
    { name: "Total Students", value: totalStudents, icon: Users, color: "bg-blue-600" },
    { name: "Total Franchisee", value: totalFranchisee, icon: Building2, color: "bg-indigo-600" },
    { name: "Active Courses", value: totalCourses, icon: BookOpen, color: "bg-cyan-600" },
    { name: "Recent Enquiries", value: 12, icon: Clock, color: "bg-rose-600" },
  ];

  const recentEnrollments = await prisma.wbca_enrollment.findMany({
    take: 5,
    orderBy: { enrollment_id: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Global overview of West Bengal Computer Academy operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat: any) => (
          <div key={stat.name} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex items-center gap-6 group hover:shadow-xl transition-all">
             <div className={`${stat.color} p-4 rounded-2xl shadow-lg shadow-${stat.color.split('-')[1]}-200 transition-transform group-hover:rotate-12`}>
                <stat.icon className="w-6 h-6 text-white" />
             </div>
             <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.name}</p>
                <div className="flex items-center gap-2">
                   <span className="text-2xl font-black text-slate-800">{stat.value}</span>
                   <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
               <h3 className="text-xl font-extrabold text-gray-900">Recent Enrollments</h3>
               <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:translate-x-1 transition-transform">
                  View All <ArrowUpRight className="w-4 h-4" />
               </button>
            </div>
            <div className="divide-y divide-slate-50">
               {recentEnrollments.map((en: any) => (
                 <div key={en.enrollment_id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500">
                          {en.enrollment_name.charAt(0)}
                       </div>
                       <div>
                          <p className="font-bold text-slate-900">{en.enrollment_name}</p>
                          <p className="text-xs text-slate-400">Enrolled for {en.course_name}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-bold text-slate-700 text-sm">{en.franchisee_code}</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{new Date(en.date_admission).toLocaleDateString()}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
            <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
            <div className="space-y-4">
               {[
                 "Update News & Notices",
                 "Manage Categories",
                 "Upload Banner Images",
                 "Download Enrollment Data",
                 "System Settings"
               ].map((action: string) => (
                 <button key={action} className="w-full text-left bg-white/10 hover:bg-white/20 p-4 rounded-2xl border border-white/10 transition-all font-bold text-sm flex items-center justify-between group">
                    {action}
                    <ChevronLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                 </button>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

function ChevronLeft(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
