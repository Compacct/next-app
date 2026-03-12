"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FranchiseeSchema = z.object({
  franchisee_name: z.string().min(2, "Institute name is required"),
  contact_person: z.string().min(2, "Your name is required"),
  address: z.string().min(5, "Address is required"),
  country: z.string().min(1, "Country is required"),
  state_name: z.string().min(1, "State is required"),
  district: z.string().min(2, "District is required"),
  pin: z.string().length(6, "PIN code must be 6 digits"),
  phone: z.string().optional(),
  mobile: z.string().min(10, "Valid mobile number is required"),
  email: z.string().email("Invalid email address"),
  know_wbca: z.string().min(1, "Source is required"),
});

export async function submitFranchiseeEnquiry(formData: FormData) {
  const validatedFields = FranchiseeSchema.safeParse({
    franchisee_name: formData.get("franchisee_name"),
    contact_person: formData.get("contact_person"),
    address: formData.get("address"),
    country: formData.get("country"),
    state_name: formData.get("state_name"),
    district: formData.get("district"),
    pin: formData.get("pin"),
    phone: formData.get("phone"),
    mobile: formData.get("mobile"),
    email: formData.get("email"),
    know_wbca: formData.get("know_wbca"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  try {
    await prisma.franchisee_enquiry.create({
      data: {
        ...validatedFields.data,
        phone: validatedFields.data.phone || "",
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to submit enquiry.",
    };
  }

  revalidatePath("/franchisee");
  redirect("/franchisee/success");
}
