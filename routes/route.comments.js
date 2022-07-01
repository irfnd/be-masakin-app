const router = require("express").Router();
const { auth } = require("../middlewares");
const { commentsController } = require("../controllers");

router
	.route("/")
	.get(auth.verifyToken, commentsController.select.selectAll)
	.post(auth.verifyToken, commentsController.insert.insertOne);
router
	.route("/:id")
	.get(auth.verifyToken, commentsController.select.selectById)
	.patch(auth.verifyToken, commentsController.update.updateOne)
	.delete(auth.verifyToken, commentsController.delete.deleteOne);
router.route("/recipe/:id").get(auth.verifyToken, commentsController.select.selectByRecipe);

module.exports = router;
