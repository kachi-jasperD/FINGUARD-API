const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  email,
  firstName,
  verificationCode,
}) => {
  return sendEmail({
    to: email,
    subject: "Your FinGuard verification code",

    text: `
Hello ${firstName || "there"},

Your FinGuard verification code is:

${verificationCode}

This code expires in 10 minutes.

If you did not create a FinGuard account, you can ignore this email.
    `,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Hello ${firstName || "there"},</h2>

        <p>
          Thank you for registering with FinGuard.
        </p>

        <p>
          Your email verification code is:
        </p>

        <div style="
          margin: 24px 0;
          text-align: center;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
        ">
          ${verificationCode}
        </div>

        <p>
          This code expires in <strong>10 minutes</strong>.
        </p>

        <p>
          If you did not create a FinGuard account,
          you can ignore this email.
        </p>

        <p>
          Best regards,<br />
          FinGuard Team
        </p>
      </div>
    `,
  });
};

module.exports = sendVerificationEmail;
