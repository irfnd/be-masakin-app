const router = require("express").Router();
const { usersController } = require("../controllers");

router.route("/").get(usersController.select.selectAll).post(usersController.insert.insertOne);
router
	.route("/:id")
	.get(usersController.select.selectById)
	.patch(usersController.update.updateOne)
	.delete(usersController.delete.deleteOne);

module.exports = router;
