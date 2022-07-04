const router = require("express").Router();
const { auth } = require("../../middlewares");
const { recipesController } = require("../../controllers");

router
	.route("/")
	.get(auth.verifyToken, recipesController.select.selectByOwnerUser)
	.post(auth.verifyToken, recipesController.insert.insertOne);
router
	.route("/:id")
	.patch(auth.verifyToken, recipesController.delete.deleteOne)
	.delete(auth.verifyToken, recipesController.delete.deleteOne);

module.exports = router;
