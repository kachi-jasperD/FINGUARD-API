const nodemailer = require("nodemailer");

let transporter = null;

if (process.env.EMAIL_MODE !== "mock") {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const sendEmail = async ({ to, subject, html }) => {
  // Development mode
  if (process.env.EMAIL_MODE === "mock") {
    console.log("\n=================================");
    console.log("📧 MOCK EMAIL");
    console.log("=================================");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("HTML:", html);
    console.log("=================================\n");

    return {
      messageId: `mock-${Date.now()}`,
      accepted: [to],
      mock: true,
    };
  }

  // Production SMTP mode
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
