const nodemailer = require("nodemailer");
const User = require("../model/user");

// for registration and reset routes:
const sendEmail = async (token, user, type) => {
  const confirmationLink = `http://localhost:3000/${type}?code=${token}&user=${user.username}`;
  const emailSubject =
    type === "confirm"
      ? "Your registration confirmation email ✔"
      : "Your password change email ✔";
  const emailText =
    type === "confirm"
      ? "click to confirm your registration"
      : "click here to change your password";

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let info = await transporter.sendMail({
    from: '"No-google auth dev team 👻" <non-google-auth@project.com>',
    to: `${user.email}`,
    subject: `${emailSubject}`,
    text: "Hello world?",
    html: `
            <b>Hello ${user.username},  </b>
            <a href="${confirmationLink}">${emailText}</a>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

//for registration route:
const checkAlreadyRegistered = async (username, email) => {
  const usernameTaken = await User.countDocuments({ username: username });
  const emailTaken = await User.countDocuments({ email: email });
  console.log("username: ", usernameTaken);
  console.log("email: ", emailTaken);
  return usernameTaken || emailTaken;
};

//for registration route:
const storeUserData = async (username, email, hash) => {
  return User.create({
    username: username,
    email: email,
    password: hash,
    confirmed: false,
  })
    .then((res) => res.username)
    .catch((err) => err);
};

//for registrationConirm route:
const confirmUser = async (username) => {
  const user = await User.findOne({ username });
  if (user.username) {
    user.confirmed = true;
    user.save();
  }
};

module.exports = {
  sendEmail,
  checkAlreadyRegistered,
  storeUserData,
  confirmUser,
};
