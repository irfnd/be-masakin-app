const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth");
const { usersController } = require("../controllers");

router
	.route("/")
	.get(verifyToken, usersController.select.selectAll)
	.post(usersController.insert.insertOne);
router
	.route("/:id")
	.get(usersController.select.selectById)
	.patch(usersController.update.updateOne)
	.delete(usersController.delete.deleteOne);

router.route("/email/:email").get(usersController.select.selectByEmail);

module.exports = router;
