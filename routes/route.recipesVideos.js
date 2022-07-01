const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth");
const { recipesVideosController } = require("../controllers");

router.route("/").post(verifyToken, recipesVideosController.insert.insertOne);

router
	.route("/:id")
	.get(verifyToken, recipesVideosController.select.selectById)
	.patch(verifyToken, recipesVideosController.update.updateOne)
	.delete(verifyToken, recipesVideosController.delete.deleteOne);
router.route("/recipe/:id").get(recipesVideosController.select.selectByRecipe);

module.exports = router;
