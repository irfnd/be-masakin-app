const router = require("express").Router();
const { handlingAuth } = require("../../middlewares");
const { Users } = require("../../controllers");

router
	.route("/")
	.get(handlingAuth.isLogin, Users.findFromUser)
	.patch(handlingAuth.isLogin, Users.updateFromUser)
	.delete(handlingAuth.isLogin, Users.deleteFromUser);

module.exports = router;
