import nodemailer from "nodemailer";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: any) => {
  try {
    // Generate token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // Save token in database
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Mailtrap SMTP Transport
    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    // Send Email
    const info = await transport.sendMail({
      from: `My App <${process.env.MAILTRAP_SENDER_EMAIL}>`,
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your Email"
          : "Reset your Password",
      html: `
        <h2>${
          emailType === "VERIFY"
            ? "Verify Your Email"
            : "Reset Your Password"
        }</h2>

        <p>Click the link below:</p>

        <a href="${process.env.DOMAIN}/${
          emailType === "VERIFY"
            ? "verifyemail"
            : "resetpassword"
        }?token=${encodeURIComponent(hashedToken)}">
          ${
            emailType === "VERIFY"
              ? "Verify Email"
              : "Reset Password"
          }
        </a>

        <br><br>

        <p>Or copy this URL:</p>

        <p>
          ${process.env.DOMAIN}/${
            emailType === "VERIFY"
              ? "verifyemail"
              : "resetpassword"
          }?token=${encodeURIComponent(hashedToken)}
        </p>
      `,
    });

    console.log("Message sent:", info.messageId);

    return info;
  } catch (error: any) {
    console.error("Mail Error:", error);
    throw new Error(error.message);
  }
};