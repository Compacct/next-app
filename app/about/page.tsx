import { Target, Eye, Award, Users, BookOpen, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="bg-slate-50 py-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 text-center leading-tight">
              About <span className="text-gradient">WBCA</span>
            </h1>
            
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100 relative mb-20">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-600 rounded-3xl -z-10 rotate-12 opacity-10" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-500 rounded-full -z-10 opacity-10 blur-2xl" />
              
              <p className="text-xl text-gray-700 leading-relaxed font-medium mb-8">
                <strong>WEST BENGAL COMPUTER ACADEMY</strong> is an ISO 9001:2008 Certified Organization. 
                Established as one of the leading computer institutes in West Bengal, we empower students 
                with world-class computer literacy.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
                 <p>
                   We offer more than 100 courses across Software, Hardware, Web Development, Accounting, 
                   Multimedia, and Networking. Our curriculum is tailored to fulfill the demands of the 
                   modern IT industry.
                 </p>
                 <p>
                   From vocational training for school children to advanced diplomas for graduates, 
                   WBCA provides a focused learning environment equipped with the latest technology.
                 </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
               <div className="bg-blue-600 text-white rounded-[2rem] p-10 shadow-xl shadow-blue-200">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                     <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-blue-50 leading-relaxed">
                    To enable the information society by promoting wider social and economic progress 
                    through the advancement of information technology science and practice. 
                    We bridge the gap between academia and industry.
                  </p>
               </div>
               <div className="bg-white border border-slate-100 rounded-[2rem] p-10 shadow-xl shadow-slate-200">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                     <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                  <p className="text-gray-600 leading-relaxed">
                    To be a world-class organization for IT Education. With over 10,000 members 
                    internationally, we deliver recognized qualifications and professional development 
                    tools for the next generation of IT practitioners.
                  </p>
               </div>
            </div>
            
            <div className="bg-slate-900 rounded-[3rem] p-12 text-center text-white overflow-hidden relative">
               <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl" />
               </div>
               <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-3">
                     <ShieldCheck className="w-8 h-8 text-blue-400 mx-auto" />
                     <p className="font-bold text-sm">Quality</p>
                  </div>
                  <div className="space-y-3">
                     <Users className="w-8 h-8 text-blue-400 mx-auto" />
                     <p className="font-bold text-sm">Community</p>
                  </div>
                  <div className="space-y-3">
                     <Award className="w-8 h-8 text-blue-400 mx-auto" />
                     <p className="font-bold text-sm">Excellence</p>
                  </div>
                  <div className="space-y-3">
                     <BookOpen className="w-8 h-8 text-blue-400 mx-auto" />
                     <p className="font-bold text-sm">Innovation</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
