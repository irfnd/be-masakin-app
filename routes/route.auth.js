const router = require("express").Router();
const { usersController, authController } = require("../controllers");
const { auth, validator } = require("../middlewares");

router.route("/register").post(usersController.insert.insertOne);
router.route("/login").post([validator("login"), auth.userLogin], authController.login.handleLogin);
router.route("/refresh-token").post(auth.tokenRefresh, authController.refresh.handleRefreshToken);

module.exports = router;
