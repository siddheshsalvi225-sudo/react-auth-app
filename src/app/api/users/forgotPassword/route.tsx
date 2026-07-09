import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/user";
import { sendEmail } from "@/helpers/mail";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "User does not exist",
          success: false,
        },
        { status: 400 }
      );
    }

    // Send reset password email
    await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({
      message: "Password reset email sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}