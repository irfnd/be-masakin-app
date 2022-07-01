const router = require("express").Router();
const { auth } = require("../middlewares");
const { profileController } = require("../controllers");

router
	.route("/")
	.get(auth.verifyToken, profileController.select.selectById)
	.patch(auth.verifyToken, profileController.update.updateOne)
	.delete(auth.verifyToken, profileController.delete.deleteOne);

module.exports = router;
