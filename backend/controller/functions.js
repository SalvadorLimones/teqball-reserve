const nodemailer = require("nodemailer");
const User = require("../model/user");
const Group = require("../model/group");

// for registration and reset routes:
const sendEmail = async (token, user, type) => {
  console.log(token, user, type);
  let confirmationLink = `http://localhost:3000/${type}?code=${token}&user=${user.username}`;
  let emailSubject =
    type === "confirm"
      ? "Your registration confirmation email ✔"
      : "Your password change email ✔";
  let emailText =
    type === "confirm"
      ? "click to confirm your registration"
      : "click here to change your password";
  console.log("NODEMAILER ELŐTT");

  let testAccount = await nodemailer.createTestAccount();

  console.log("CHECK REG!!!!");
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

//for group route:
const storeGroupData = async (id, name, description) => {
  try {
    Group.create({
      name: name,
      description: description,
      members: [{ id: id, role: "owner" }],
    });
    return 200;
  } catch (err) {
    return 400;
  }
};
//for group route:
const addNewMember = async (userId, groupId) => {
  try {
    const group = await Group.findOne({ _id: groupId });
    if (!group) return 409;
    group.members.push({ id: userId, role: "pending" });
    group.save();
    return 200;
  } catch (err) {
    return 400;
  }
};

//for group route:
const getGrouplist = async (id) => {
  const groupList = [];
  const groups = await Group.find();
  const setStatus = (members, id) => {
    const status = members.find((member) => member.id === id);
    return status ? status.role : "";
  };
  for (const group of groups) {
    groupList.push({
      id: group.id,
      name: group.name,
      status: setStatus(group.members, id),
    });
  }
  console.log("GROUPLIST: ", groupList);
  return groupList;
};

module.exports = {
  sendEmail,
  checkAlreadyRegistered,
  storeUserData,
  confirmUser,
  storeGroupData,
  getGrouplist,
  addNewMember,
};
