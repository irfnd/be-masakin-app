const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth");
const { profileController } = require("../controllers");

router
	.route("/")
	.get(verifyToken, profileController.select.selectById)
	.patch(verifyToken, profileController.update.updateOne)
	.delete(verifyToken, profileController.delete.deleteOne);

module.exports = router;
