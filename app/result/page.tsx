import prisma from "@/lib/db";
import { Search, Printer, User, GraduationCap, Calendar, BookOpen, AlertCircle } from "lucide-react";
import { numberToWords } from "@/lib/utils";
import ResultClient from "./ResultClient";

export default async function ResultPage({
   searchParams,
}: {
   searchParams: { enrollment_no?: string };
}) {
   const enrollmentNo = searchParams.enrollment_no;
   let enrollment = null;
   let results: any[] = [];
   let error = null;

   if (enrollmentNo) {
      enrollment = await prisma.wbca_enrollment.findFirst({
         where: { enrollment_no: enrollmentNo, published: "Y" },
      });

      if (enrollment) {
         results = await prisma.wbca_result.findMany({
            where: { enrollment_id: enrollment.enrollment_id },
            orderBy: { subj_order: "asc" },
         });
      } else {
         error = "No result found for the provided enrollment number.";
      }
   }

   const totals = results.reduce(
      (acc: any, row: any) => {
         acc.maxTotal += row.max_internal + row.max_theory;
         acc.obtainedTotal += row.internal_mark + row.theory_mark;
         return acc;
      },
      { maxTotal: 0, obtainedTotal: 0 }
   );

   return (
      <div className="pt-20 min-h-screen bg-slate-50">
         <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
               <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 text-center">
                     Examination <span className="text-gradient">Results</span>
                  </h1>

                  {/* Search Box */}
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 mb-12">
                     <form action="/result" className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                           <input
                              name="enrollment_no"
                              defaultValue={enrollmentNo}
                              placeholder="Enter your enrollment number..."
                              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 bg-white transition-all outline-none font-medium"
                           />
                        </div>
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                           Check Now
                        </button>
                     </form>
                     {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 font-medium">
                           <AlertCircle className="w-5 h-5" />
                           <span>{error}</span>
                        </div>
                     )}
                  </div>

                  {/* Result Display */}
                  {enrollment && (
                     <div id="result-to-print" className="bg-white p-6 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden relative print:p-0 print:shadow-none print:border-none">

                        {/* Print Header Placeholder */}
                        <div className="hidden print:block mb-8 text-center border-b-2 border-slate-200 pb-8">
                           <h2 className="text-3xl font-bold text-blue-600">West Bengal Computer Academy</h2>
                           <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Official Statement of Marks</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                           <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                 <User className="w-5 h-5 text-blue-500" />
                                 <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">Candidate Name</span>
                              </div>
                              <p className="text-xl font-bold text-gray-900 ml-8">{enrollment.enrollment_name}</p>

                              <div className="flex items-center gap-3 mt-6">
                                 <GraduationCap className="w-5 h-5 text-blue-500" />
                                 <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">Course Name</span>
                              </div>
                              <p className="text-lg font-bold text-gray-700 ml-8">{enrollment.course_name}</p>
                           </div>

                           <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                 <BookOpen className="w-5 h-5 text-blue-500" />
                                 <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">Enrollment No.</span>
                              </div>
                              <p className="text-xl font-bold text-gray-900 ml-8">{enrollment.enrollment_no}</p>

                              <div className="flex items-center gap-3 mt-6">
                                 <Calendar className="w-5 h-5 text-blue-500" />
                                 <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">Session</span>
                              </div>
                              <p className="text-lg font-bold text-gray-700 ml-8 text-gradient">{enrollment.session}</p>
                           </div>
                        </div>

                        {/* Marks Table */}
                        <div className="overflow-x-auto mb-10">
                           <table className="w-full border-collapse">
                              <thead>
                                 <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest text-left">
                                    <th className="px-6 py-4 rounded-tl-2xl border-b border-slate-100">Subject</th>
                                    <th className="px-6 py-4 text-center border-b border-slate-100">Theory</th>
                                    <th className="px-6 py-4 text-center border-b border-slate-100">Practical</th>
                                    <th className="px-6 py-4 text-center border-b border-slate-100">Total (MM)</th>
                                    <th className="px-6 py-4 text-center rounded-tr-2xl border-b border-slate-100">Total (MO)</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                 {results.map((row: any) => (
                                    <tr key={row.subject_name} className="hover:bg-slate-50/50 transition-colors">
                                       <td className="px-6 py-4 font-bold text-gray-800">{row.subject_name}</td>
                                       <td className="px-6 py-4 text-center text-gray-600">{row.theory_mark}</td>
                                       <td className="px-6 py-4 text-center text-gray-600">{row.internal_mark}</td>
                                       <td className="px-6 py-4 text-center text-gray-400 font-medium">
                                          {row.max_internal + row.max_theory}
                                       </td>
                                       <td className="px-6 py-4 text-center">
                                          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-bold">
                                             {row.internal_mark + row.theory_mark}
                                          </span>
                                       </td>
                                    </tr>
                                 ))}
                                 <tr className="bg-blue-600 text-white font-bold">
                                    <td className="px-6 py-5 rounded-bl-2xl">Aggregate Totals</td>
                                    <td colSpan={2} className="px-6 py-5" />
                                    <td className="px-6 py-5 text-center">{totals.maxTotal}</td>
                                    <td className="px-6 py-5 text-center rounded-br-2xl">{totals.obtainedTotal}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>

                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                           <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total Marks Obtained (In Words)</p>
                           <p className="text-xl font-bold text-gray-900 capitalize">
                              {numberToWords(totals.obtainedTotal)} Only
                           </p>
                        </div>

                        <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8 no-print">
                           <div className="text-xs text-gray-400 max-w-xs">
                              <p><strong>ABBREVIATION:</strong> MM=MAXIMUM MARKS | MO=MARKS OBTAINED | AB=ABSENT | NC=NOT COMPLETED</p>
                           </div>
                           <ResultClient />
                        </div>
                     </div>
                  )}

               </div>
            </div>
         </section>
      </div>
   );
}
