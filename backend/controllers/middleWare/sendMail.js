const nodemailer = require("nodemailer");

// Function to send a confirmation email
const sendConfirmationEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    // Your email service configuration (e.g., SMTP or other)
    host: "smtp.gmail.com",
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.gmailId,
      pass: process.env.gmailPass,
    },
  });

  const confirmationLink = `${process.env.FRONT1}/verify/${token}`; // Adjust the frontend URL
  const mailOptions = {
    from: process.env.gmailId,
    to: email,
    subject: "Confirm Your Subscription to OdinBook",
    html: `<p>Thanks a lot for signing up! </p> <p> Please Click <a href="${confirmationLink}">here</a> to confirm your email. This link is valid for the next 2 hours only. </p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending confirmation email:", error);
    } else {
      console.log("Confirmation email sent:", info.response);
    }
  });
};

// Function to send a confirmation email
const sendResetPWEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    // Your email service configuration (e.g., SMTP or other)
    host: "smtp.gmail.com",
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.gmailId,
      pass: process.env.gmailPass,
    },
  });

  const confirmationLink = `${process.env.FRONT1}/reset-password/${token}`; // Adjust the frontend URL
  const mailOptions = {
    from: process.env.gmailId,
    to: email,
    subject: "Reset your OdinBook Password",
    html: `<p> Please Click <a href="${confirmationLink}">here</a> to set a new Password for your OdinBook account. This link is valid for the next 2 hours only. </p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending confirmation email:", error);
    } else {
      console.log("Password Reset email sent:", info.response);
    }
  });
};

module.exports = { sendConfirmationEmail, sendResetPWEmail };
