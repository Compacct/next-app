"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitFeedback(formData: FormData) {
  const fb_name = formData.get("fb_name") as string;
  const fb_mobile = formData.get("fb_mobile") as string;
  const fb_email = formData.get("fb_email") as string;
  const fb_comments = formData.get("fb_comments") as string;
  const userCode = formData.get("code") as string;
  const correctCode = formData.get("confirmationCode") as string;

  if (userCode !== correctCode) {
    return { error: "Invalid confirmation code. Please try again." };
  }

  if (!fb_name || !fb_mobile || !fb_email || !fb_comments) {
    return { error: "All fields are required." };
  }

  try {
    await prisma.feedback.create({
      data: {
        fb_name,
        fb_mobile,
        fb_email,
        fb_comments,
      },
    });

    revalidatePath("/contact");
    return { success: "Thank you! Your message has been sent successfully." };
  } catch (error) {
    console.error("Feedback error:", error);
    return { error: "Failed to submit feedback. Please try again later." };
  }
}
