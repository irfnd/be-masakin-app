const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth");
const { commentsController } = require("../controllers");

router
	.route("/")
	.get(verifyToken, commentsController.select.selectAll)
	.post(verifyToken, commentsController.insert.insertOne);
router
	.route("/:id")
	.get(verifyToken, commentsController.select.selectById)
	.patch(verifyToken, commentsController.update.updateOne)
	.delete(verifyToken, commentsController.delete.deleteOne);
router.route("/recipe/:id").get(verifyToken, commentsController.select.selectByRecipe);

module.exports = router;
