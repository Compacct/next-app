import Hero from "@/components/Hero";
import prisma from "@/lib/db";
import { ArrowRight, BookOpen, Users, ChevronRight } from "lucide-react";
import Link from "next/link";
import StudentGallery from "@/components/StudentGallery";
import AnimatedSection from "@/components/AnimatedSection";

// Helper for formatted date
const formatDate = (date: Date | null) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

export default async function Home() {
  // Fetch News
  const newsItems = await prisma.news.findMany({
    where: { published: "Y" },
    orderBy: { date_updated: "desc" },
    take: 5,
  });

  // Fetch success stories (student images)
  const studentsFromDb = await prisma.student_images.findMany({
    where: { published: "Y" },
    take: 8,
  });

  // Combine with dummy students for demo purposes
  const dummyStudents = [
    { image_id: 1001, student_name: "Amit Kumar", course_name: "Adv. Diploma", mimetype: "png", custom_url: "/student_success_1_1773314485410.png" },
    { image_id: 1002, student_name: "Priya Das", course_name: "Diploma", mimetype: "png", custom_url: "/student_success_2_1773314505254.png" },
    { image_id: 1003, student_name: "Sanjay Sen", course_name: "Certificate", mimetype: "png", custom_url: "/student_success_1_1773314485410.png" },
    { image_id: 1004, student_name: "Anjali Ray", course_name: "Professional", mimetype: "png", custom_url: "/student_success_2_1773314505254.png" },
  ];

  const students = [...studentsFromDb, ...dummyStudents].slice(0, 16);

  return (
    <div>
      <Hero />

      {/* Main Content Sections */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* News Section */}
            <AnimatedSection 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-slate-50/50 backdrop-blur-sm rounded-[2.5rem] p-10 border border-slate-100 shadow-sm h-full">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-black text-gray-900">Latest Updates</h2>
                  <Link href="/news" className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all text-blue-600">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className="space-y-8">
                  {newsItems.map((item: any, idx: number) => (
                    <AnimatedSection 
                      key={item.doc_id} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2 block">
                        {formatDate(item.date_updated)}
                      </span>
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-snug">
                        {item.document_name}
                      </h3>
                      <div className="h-px bg-slate-200 mt-6 group-last:hidden" />
                    </AnimatedSection>
                  ))}
                </div>
                {newsItems.length === 0 && (
                  <p className="text-slate-400 font-medium italic">No recent news available.</p>
                )}
              </div>
            </AnimatedSection>

            {/* Courses Section */}
            <AnimatedSection 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/50 h-full flex flex-col items-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mb-10 shadow-xl shadow-blue-200 relative z-10">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-black text-gray-900 mb-4 z-10 text-center">Academic Courses</h2>
                <p className="text-slate-500 font-medium text-center mb-8 z-10">Choose from wide variety of recognized technical courses.</p>
                
                <div className="grid grid-cols-1 gap-3 w-full z-10">
                  {[
                    "School Level Projects",
                    "Certificate Programs",
                    "Professional Diplomas",
                    "Advance Post Graduate",
                  ].map((course: string) => (
                    <AnimatedSection
                      key={course}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 text-gray-800 font-bold hover:bg-blue-600 hover:text-white transition-all cursor-default group"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-600 group-hover:bg-white" />
                      {course}
                    </AnimatedSection>
                  ))}
                </div>
                
                <Link
                  href="/courses"
                  className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all z-10"
                >
                  Explore Details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Franchisee Section */}
            <AnimatedSection 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-300 h-full relative overflow-hidden">
                <img 
                  src="/hero_background_1773314390166.png" 
                  alt="Pattern" 
                  className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
                />
                
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-10 relative z-10 shadow-lg">
                  <Users className="w-9 h-9 text-white" />
                </div>
                
                <h2 className="text-3xl font-black mb-4 relative z-10">Franchise Program</h2>
                <p className="text-slate-400 font-medium mb-10 leading-relaxed relative z-10">
                  Partner with West Bengal's fastest growing IT education network. Open your own state-of-the-art academy.
                </p>
                
                <div className="space-y-4 relative z-10">
                  <AnimatedSection whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/franchisee"
                      className="block w-full bg-blue-600 text-white text-center py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
                    >
                      Start Your Academy
                    </Link>
                  </AnimatedSection>
                  <AnimatedSection whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/login"
                      className="block w-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-center py-5 rounded-2xl font-bold hover:bg-white/20 transition-all"
                    >
                      Franchisee Login
                    </Link>
                  </AnimatedSection>
                </div>
                
                <div className="mt-12 flex items-center gap-6 relative z-10 opacity-60">
                  <div className="flex -space-x-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800" />
                    ))}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Join 50+ Partners</p>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Success Stories / Students */}
      <section className="py-24 bg-slate-50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-white to-transparent" />
        
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Our Success <span className="text-blue-600">Stories</span></h2>
            <p className="grow text-slate-500 font-medium max-w-2xl mx-auto text-lg">
              Empowering dreams and building careers. See our students achieving excellence in the global tech landscape.
            </p>
          </AnimatedSection>
          
          <StudentGallery students={students} />
        </div>
      </section>
    </div>
  );
}
