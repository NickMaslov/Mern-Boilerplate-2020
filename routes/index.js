const router = require("express").Router();

const auth = require("./auth.routes");
const user = require("./user.routes");

router.use("/auth", auth);
router.use("/user", user);

module.exports = router;
