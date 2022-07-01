const router = require("express").Router();
const { auth } = require("../../middlewares");
const { usersController } = require("../../controllers");

const adminRole = [auth.verifyToken, auth.isAdmin];

router
	.route("/")
	.get(adminRole, usersController.select.selectAll)
	.post(adminRole, usersController.insert.insertOne);
router
	.route("/:id")
	.get(adminRole, usersController.select.selectById)
	.patch(adminRole, usersController.update.updateOne)
	.delete(adminRole, usersController.delete.deleteOne);

module.exports = router;
