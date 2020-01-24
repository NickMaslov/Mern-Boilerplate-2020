const express = require("express");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router.route("/signin").post(authCtrl.signinValidator, authCtrl.signin);
router.route("/logout").get(authCtrl.logout);

module.exports = router;
