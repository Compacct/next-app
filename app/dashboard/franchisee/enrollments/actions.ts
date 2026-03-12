"use server";

import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const EnrollmentSchema = z.object({
  course_id: z.string().min(1, "Course is required"),
  session_id: z.string().min(1, "Session is required"),
  date_admission: z.string().min(1, "Admission Date is required"),
  enrollment_name: z.string().min(1, "Name is required"),
  fathers_name: z.string().min(1, "Father's Name is required"),
  mothers_name: z.string().min(1, "Mother's Name is required"),
  dob_day: z.string(),
  dob_month: z.string(),
  dob_year: z.string(),
  sex: z.string().min(1, "Gender is required"),
  address: z.string().min(1, "Address is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  pin: z.string().min(1, "PIN is required"),
  contact_no: z.string().min(10, "Valid contact number required"),
  email: z.string().email("Valid email required"),
});

export async function createEnrollment(formData: FormData) {
  const session = await getServerSession(authOptions);
  const franchiseeCode = (session?.user as any)?.code;

  if (!franchiseeCode) {
    throw new Error("Unauthorized");
  }

  const rawData = Object.fromEntries(formData.entries());
  const validated = EnrollmentSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }

  const data = validated.data;
  const dob = `${data.dob_year}-${data.dob_month}-${data.dob_day}`;

  try {
    // 1. Fetch Course and Session details
    const course = await prisma.wbca_course.findUnique({
      where: { course_id: parseInt(data.course_id) }
    });

    const sessionData = await prisma.wbca_session.findUnique({
      where: { session_id: parseInt(data.session_id) }
    });

    if (!course || !sessionData) {
      return { error: { global: "Course or Session not found" } };
    }

    // 2. Generate Enrollment Number
    const sessionName = sessionData.session;
    const period = sessionData.period;
    const courseCode = course.course_code;

    // Count existing enrollments for this session to get next ID
    const count = await prisma.wbca_enrollment.count({
      where: { session: sessionName }
    });
    
    const nextId = count + 1;
    const yearPrefix = sessionName.split('-')[0];
    const enrollmentNo = `${yearPrefix}${period}${courseCode}${nextId.toString().padStart(3, '0')}`;

    // 3. Create Enrollment
    await prisma.wbca_enrollment.create({
      data: {
        franchisee_code: franchiseeCode,
        course_name: course.course_name,
        course_code: courseCode,
        session: sessionName,
        period: period.toString(),
        enrollment_name: data.enrollment_name,
        fathers_name: data.fathers_name,
        mothers_name: data.mothers_name,
        dob: new Date(dob),
        sex: data.sex,
        address: data.address,
        district: data.district,
        state: data.state,
        pin: data.pin,
        contact_no: data.contact_no,
        email: data.email,
        date_admission: new Date(data.date_admission),
        enrollment_no: enrollmentNo,
        enrollment_status: "Pending",
        published: "Y",
        mime: "jpg", // Default placeholder
        result_issue_date: new Date(), // Placeholder
        payment_mode: "Cash", // Placeholder
        payment_no: "N/A", // Placeholder
        amount: 0, // Placeholder
      }
    });

    revalidatePath("/dashboard/franchisee/enrollments");
  } catch (err) {
    console.error(err);
    return { error: { global: "Failed to create enrollment. Please try again." } };
  }

  redirect("/dashboard/franchisee/enrollments");
}
