const router = require('express').Router();
const EventCtrl = require("../controller/event");
// const authJwt = require('../middleware/authJwt');

router.post("/register", EventCtrl.apiRegister);
// router.post("/register", [authJwt.verifyToken], EventCtrl.apiRegister);

module.exports = router
