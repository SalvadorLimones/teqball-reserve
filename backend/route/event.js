const router = require('express').Router();
const EventCtrl = require("../controller/event");
const authJwt = require('../middleware/authJwt');

router.post("/register", EventCtrl.apiRegister);
// router.post("/register", [authJwt.verifyToken], EventCtrl.apiRegister);
router.get("/list", EventCtrl.apiEventList);
router.post("/connect", EventCtrl.apiConnectToEvent);

module.exports = router
