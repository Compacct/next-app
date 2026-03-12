import Hero from "@/components/Hero";
import { BookOpen, GraduationCap, FileCheck, PhoneCall } from "lucide-react";

export default function AdmissionPage() {
  return (
    <div className="pt-20">
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 text-center">
              Admission <span className="text-gradient">Procedure</span>
            </h1>
            <p className="text-lg text-gray-600 text-center mb-16">
              Start your journey with West Bengal Computer Academy today. 
              Our admission process is simple, transparent, and student-friendly.
            </p>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200 border border-slate-100">
              <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
                <p>
                  The admission process of 3 months or 6 months or 12 months or 18 months or 24 months 
                  courses in Certificate or Diploma or Advance Diploma Course is governed by 
                  <strong> Nayagram Satsang Group of Society</strong>, Paschim Medinipur, and the competent authority.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Eligibility</h3>
                    <p>
                      All students are admitted in the computer courses with a minimum qualification 
                      of <strong>Madhyamik (10th)</strong> or equivalent. 
                    </p>
                    <p>
                      We also offer school-level courses for students from <strong>class fifth</strong> or equivalent.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Documents Required</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>10th Pass Admit & Marksheet</li>
                      <li>12th Pass Marksheet (if applicable)</li>
                      <li>Graduation Marksheet (if applicable)</li>
                      <li>Photo ID Proof (Aadhar/Voter ID)</li>
                      <li>Passport size photographs</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-16 p-8 bg-blue-600 rounded-2xl text-white">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-2">Institute Level Admission</h3>
                      <p className="text-blue-100 italic">
                        Once the documents are verified, students will be informed of further 
                        procedure of admission either by phone or email.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                       <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-50 transition-all flex items-center space-x-2">
                         <PhoneCall className="w-5 h-5" />
                         <span>Contact Us Now</span>
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
