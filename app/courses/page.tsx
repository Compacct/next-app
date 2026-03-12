import prisma from "@/lib/db";
import { Book, GraduationCap, Clock, ChevronRight, Search, Info } from "lucide-react";
import CoursesClient from "./CoursesClient";

export default async function CoursesPage() {
  const categories = await prisma.wbca_category.findMany({
    orderBy: { category_id: "asc" },
  });

  const courses = await prisma.wbca_course.findMany({
    orderBy: { course_code: "asc" },
  });

  // Fetch all subjects for the modal lookup
  const semesters = await prisma.wbca_semester.findMany({
    orderBy: { semester: "asc" },
  });

  const subjects = await prisma.wbca_subject.findMany({
    orderBy: { subj_order: "asc" },
  });

  return (
    <div className="pt-20">
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
                Explore Our <span className="text-gradient">Courses</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover a wide range of certified computer courses designed to prepare you for a successful career in IT.
              </p>
            </div>

            <CoursesClient
              categories={categories}
              courses={courses}
              semesters={semesters}
              subjects={subjects}
            />

            <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Introduction to Our Programs</h3>
              </div>
              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-4">
                <p>
                  West Bengal Computer Academy (WBCA) is an Autonomous Institute for Computer Education and Information Science.
                  We offer Certificate, Diploma, Advanced Diploma, and Job-Oriented programs in Computer and Information Systems.
                </p>
                <p>
                  Our courses are designed to be affordable while maintaining high standards. We offer both on-site training
                  at our various campuses and online admission options for students who prefer to study independently.
                </p>
                <p>
                  From <strong>Class V</strong> students to <strong>Post-Graduates</strong> and even <strong>Service/Job holders</strong>,
                  we have courses tailored for everyone. Visit your nearest WBCA Study Center to start your journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
