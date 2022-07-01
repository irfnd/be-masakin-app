const router = require("express").Router();
const { auth } = require("../../middlewares");
const { recipesVideosController } = require("../../controllers");

router.route("/").post(auth.verifyToken, recipesVideosController.insert.insertOne);
router
	.route("/:id")
	.get(auth.verifyToken, recipesVideosController.select.selectById)
	.patch(auth.verifyToken, recipesVideosController.update.updateOne)
	.delete(auth.verifyToken, recipesVideosController.delete.deleteOne);
router.route("/recipe/:id").get(recipesVideosController.select.selectByRecipe);

module.exports = router;
