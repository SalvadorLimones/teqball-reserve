const router = require('express').Router();
const EventCtrl = require("../controller/event");
const authJwt = require('../middleware/authJwt');

// router.post("/register", [authJwt.verifyToken], EventCtrl.apiRegister);
router.post("/register", [authJwt.verifyToken], EventCtrl.apiRegister);
router.get("/list", [authJwt.verifyToken], EventCtrl.apiEventList);
router.post("/connect", [authJwt.verifyToken], EventCtrl.apiConnectToEvent);
router.post("/disconnect", [authJwt.verifyToken], EventCtrl.apiDisconnectFromEvent);

module.exports = router
