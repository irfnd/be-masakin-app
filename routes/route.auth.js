const router = require("express").Router();
const { userLogin, tokenRefresh } = require("../middlewares/auth");
const { usersController, authController } = require("../controllers");

router.route("/register").post(usersController.insert.insertOne);
router.route("/login").post(userLogin, authController.login.handleLogin);
router.route("/refresh-token").post(tokenRefresh, authController.refresh.handleRefreshToken);

module.exports = router;
