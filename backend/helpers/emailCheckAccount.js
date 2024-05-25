import nodemailer from "nodemailer";

/*
  This function sends an email to the user to check their account
  @param {Object} data - Object with the email, name and token of the user
*/
const emailCheckAccount = async (data) => {
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
    subject: "Check your account in Personal Finance Tracker",
    text: "Check your account in Personal Finance Tracker",
    html: `<p>Hello! ${name}, check your account in Personal Finance Tracker.</p>
    <p> Your account is almost ready, you just have to check it at the following link: </p>
    <a href="http://localhost:3000/confirm-account/${token}">Check account<a></p>

    <p> If you did not create this account you can ignore this message </p>
    
    `,
  });
};
export default emailCheckAccount;
