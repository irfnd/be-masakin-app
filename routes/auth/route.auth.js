const router = require("express").Router();
const { Auth } = require("../../controllers");
const { validator } = require("../../middlewares");

router.route("/register").post(validator("register"), Auth.register);
router.route("/login").post(validator("login"), Auth.login);
router.route("/refresh").post(validator("refresh"), Auth.refresh);

module.exports = router;
