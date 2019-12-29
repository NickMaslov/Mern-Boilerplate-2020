const express = require("express");
const userCtrl = require("../controllers/user.controller");
// import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/")
  .get(userCtrl.list)
  .post(userCtrl.createValidator, userCtrl.create);

router
  .route("/:userId")
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

router.param("userId", userCtrl.userByID);

module.exports = router;
