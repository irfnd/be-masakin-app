const router = require("express").Router();
const { verifyTokenAsAdmin } = require("../middlewares/auth");
const { usersController } = require("../controllers");

router
	.route("/")
	.get(verifyTokenAsAdmin, usersController.select.selectAll)
	.post(verifyTokenAsAdmin, usersController.insert.insertOne);
router
	.route("/:id")
	.get(verifyTokenAsAdmin, usersController.select.selectById)
	.patch(verifyTokenAsAdmin, usersController.update.updateOne)
	.delete(verifyTokenAsAdmin, usersController.delete.deleteOne);

module.exports = router;
