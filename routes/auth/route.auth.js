const router = require("express").Router();
const { Auth } = require("../../controllers");
const { validator, handlingAuth } = require("../../middlewares");

router.route("/register").post(validator("register"), Auth.register);
router.route("/login").post(validator("login"), Auth.login);
router.route("/refresh").post(validator("refresh"), Auth.refresh);
router.route("/send-verification").post(handlingAuth.isLogin, Auth.sendVerification);
router.route("/verify").get(validator("verify", "query"), Auth.verify);

module.exports = router;
