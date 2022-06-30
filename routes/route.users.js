const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middlewares/auth");
const { usersController } = require("../controllers");

router
	.route("/")
	.get([verifyToken, isAdmin], usersController.select.selectAll)
	.post([verifyToken, isAdmin], usersController.insert.insertOne);
router
	.route("/:id")
	.get(verifyToken, usersController.select.selectById)
	.patch(verifyToken, usersController.update.updateOne)
	.delete(verifyToken, usersController.delete.deleteOne);

module.exports = router;
