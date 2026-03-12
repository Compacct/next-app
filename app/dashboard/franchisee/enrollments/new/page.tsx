import prisma from "@/lib/db";
import EnrollmentForm from "@/app/dashboard/franchisee/enrollments/new/EnrollmentForm";

export default async function NewEnrollmentPage() {
  const courses = await prisma.wbca_course.findMany({
    orderBy: { course_name: "asc" },
  });

  const sessions = await prisma.wbca_session.findMany({
    where: { published: "Y" },
    orderBy: { session_id: "asc" },
  });

  const states = await prisma.master_state.findMany({
    orderBy: { state_name: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">Student <span className="text-gradient">Enrollment Form</span></h1>
        <p className="text-slate-500 text-center mt-2">Enter the details of the student for fresh admission.</p>
      </div>
      
      <EnrollmentForm 
        courses={courses} 
        sessions={sessions} 
        states={states} 
      />
    </div>
  );
}
