const express = require("express");
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router
  .route("/")
  .get(userCtrl.list)
  .post(userCtrl.createUserValidator, userCtrl.create);

router
  .route("/:userId")
  .get(userCtrl.read)
  .put(authCtrl.hasAuthorization, userCtrl.updateUserValidator, userCtrl.update)
  .delete(authCtrl.hasAuthorization, userCtrl.remove);

router.param("userId", userCtrl.userByID);

module.exports = router;
