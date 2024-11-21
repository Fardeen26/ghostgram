import { ApiResponse } from '@/types/ApiResponse';
import { transporter } from "@/lib/nodemailer";
import { customerMailTemplate } from "../../emails/customEmailTemplate";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const htmlContent = customerMailTemplate(username, verifyCode);

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "GhostGram, Verification Code",
      text: "Your service is successfully booked, Happy!",
      html: htmlContent,
    });

    return { success: true, message: 'Verification email sent successfully.' };

  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
