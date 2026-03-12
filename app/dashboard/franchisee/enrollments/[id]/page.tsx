import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User, Phone, Mail, MapPin, Calendar, BookOpen, GraduationCap, X, Printer } from "lucide-react";
import Link from "next/link";

export default async function ViewEnrollmentPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  
  const enrollment = await prisma.wbca_enrollment.findUnique({
    where: { enrollment_id: parseInt(params.id) },
  });

  if (!enrollment) {
    return <div>Enrollment not found.</div>;
  }

  // Check permission
  if (session?.user?.role !== "admin" && (session?.user as any)?.code !== enrollment.franchisee_code) {
     return <div>Access Denied.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden relative">
         
         <div className="p-10 bg-blue-600 text-white flex justify-between items-start">
            <div>
               <h1 className="text-3xl font-black mb-2">{enrollment.enrollment_name}</h1>
               <div className="flex items-center gap-4 text-blue-100 text-sm font-bold uppercase tracking-widest">
                  <span>{enrollment.enrollment_no}</span>
                  <span className="w-1 h-1 bg-blue-300 rounded-full" />
                  <span>{enrollment.course_name}</span>
               </div>
            </div>
            <Link href="/dashboard/franchisee/enrollments" className="bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-all">
               <X className="w-6 h-6" />
            </Link>
         </div>

         <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               
               <div className="md:col-span-2 space-y-10">
                  <section>
                     <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Student Information
                     </h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                        <div>
                           <p className="text-xs text-slate-400 font-bold uppercase mb-1">Father's Name</p>
                           <p className="font-bold text-gray-900">{enrollment.fathers_name}</p>
                        </div>
                        <div>
                           <p className="text-xs text-slate-400 font-bold uppercase mb-1">Mother's Name</p>
                           <p className="font-bold text-gray-900">{enrollment.mothers_name}</p>
                        </div>
                        <div>
                           <p className="text-xs text-slate-400 font-bold uppercase mb-1">Gender</p>
                           <p className="font-bold text-gray-900">{enrollment.sex}</p>
                        </div>
                        <div>
                           <p className="text-xs text-slate-400 font-bold uppercase mb-1">Date of Birth</p>
                           <p className="font-bold text-gray-900">{enrollment.dob.toLocaleDateString()}</p>
                        </div>
                     </div>
                  </section>

                  <section>
                     <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Communication
                     </h3>
                     <div className="space-y-6">
                        <div>
                           <p className="text-xs text-slate-400 font-bold uppercase mb-1">Address</p>
                           <p className="font-bold text-gray-900 leading-relaxed max-w-sm">
                              {enrollment.address}, {enrollment.district}, {enrollment.state} - {enrollment.pin}
                           </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                                 <Phone className="w-5 h-5 text-slate-500" />
                              </div>
                              <p className="font-bold text-gray-800">{enrollment.contact_no}</p>
                           </div>
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                                 <Mail className="w-5 h-5 text-slate-500" />
                              </div>
                              <p className="font-bold text-gray-800">{enrollment.email}</p>
                           </div>
                        </div>
                     </div>
                  </section>
               </div>

               <div className="space-y-8">
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Registration Photo</p>
                     <div className="aspect-square bg-slate-200 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                        <User className="w-12 h-12 text-slate-400" />
                     </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
                     <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Enrollment Details</p>
                     <div className="space-y-4">
                        <div>
                           <p className="text-[10px] font-bold text-blue-400 uppercase">Admission Date</p>
                           <p className="font-bold text-blue-900 uppercase">{enrollment.date_admission.toLocaleDateString()}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-blue-400 uppercase">Session</p>
                           <p className="font-bold text-blue-900 uppercase">{enrollment.session}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-blue-400 uppercase">Franchisee</p>
                           <p className="font-bold text-blue-900 uppercase">{enrollment.franchisee_code}</p>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>

         <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400 font-bold uppercase">Record last updated: {enrollment.date_updated?.toDateString()}</p>
            <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all">
               <Printer className="w-4 h-4" />
               <span>Print ID Preview</span>
            </button>
         </div>

      </div>
    </div>
  );
}
