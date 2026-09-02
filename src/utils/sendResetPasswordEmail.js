const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async ({ email, firstName, resetCode }) => {
  return sendEmail({
    to: email,
    subject: "Your FinGuard password reset code",

    text: `
Hello ${firstName || "there"},

Your FinGuard password reset code is:

${resetCode}

This code expires in 10 minutes.

If you did not request a password reset, you can safely ignore this email.
    `,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Hello ${firstName || "there"},</h2>

        <p>
          We received a request to reset your FinGuard password.
        </p>

        <p>
          Your password reset code is:
        </p>

        <div style="
          margin: 24px 0;
          text-align: center;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
        ">
          ${resetCode}
        </div>

        <p>
          This code expires in <strong>10 minutes</strong>.
        </p>

        <p>
          If you did not request a password reset,
          you can safely ignore this email.
        </p>

        <p>
          Best regards,<br />
          FinGuard Team
        </p>
      </div>
    `,
  });
};

module.exports = sendResetPasswordEmail;
