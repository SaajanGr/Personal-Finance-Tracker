import nodemailer from "nodemailer";

/*
  This function sends an email to the user to reset their password
  @param {Object} data - Object with the email, name and token of the user
*/
const emailForgotPass = async (data) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true, // use SSL
    port: '465',
    auth: {
      user: 'user',
      pass: 'password',
    },
  });

  const { email, name, token } = data;
  // Send the email
  const info = await transporter.sendMail({
    from: 'email',
    to: email,
    subject: "Reset your password",
    text: "Reset your password",
    html: `<p>Hello! ${name}, You have requested to reset your password.</p>
    <p> Follow the link below to generate a new password: </p>
    <a href="http://localhost:3000/new-password/${token}">Restore password<a></p>

    <p> If you did not create this account you can ignore this message </p>
    
    `,
  });
};

export default emailForgotPass;
