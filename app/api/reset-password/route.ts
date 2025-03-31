import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { mailOptions, transporter } from "@/lib/node-mailer";
import { generateToken } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email } = data;

    // ✅ Ensure email is provided
    if (!email) {
      return NextResponse.json(
        { status: "error", message: "Email is required" },
        { status: 400 }
      );
    }

    // ✅ Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Generate token and reset link
    const token = generateToken();
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

    // ✅ Update user with reset token
    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: new Date(Date.now() + 3600000), // Token valid for 1 hour
      },
    });

    // ✅ Send password reset email
    try {
      await transporter.sendMail({
        ...mailOptions,
        to: email,
        subject: "Reset Password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json(
        { status: "error", message: "Failed to send reset email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { status: "ok", message: "Reset email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { status: "error", message: "Something went wrong" },
      { status: 500 }
    );
  }
}
