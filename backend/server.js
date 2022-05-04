require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

const registrationRouts = require("./route/registration");
const registrationConfirmRouts = require("./route/registrationConfirm");
const loginRouts = require("./route/login");
const resetRouts = require("./route/reset");
const passwordRouts = require("./route/password");
const groupRouts = require("./route/group");
const eventRouts = require("./route/event");

mongoose.connect(process.env.CONNECTION_STRING);
mongoose.connection.once("open", function () {
  console.log("*** MongoDB got connected ***");
  console.log(
    `Our Current Database Name : ${mongoose.connection.db.databaseName}`
  );
});

app.use(cors());
app.use(express.json());

app.use("/api/registration", registrationRouts);
app.use("/api/confirm", registrationConfirmRouts);
app.use("/api/login", loginRouts);
app.use("/api/reset", resetRouts);
app.use("/api/password", passwordRouts);
app.use("/api/group", groupRouts);
app.use("/api/event", eventRouts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
