const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth");
const { savedRecipesController } = require("../controllers");

router
	.route("/")
	.post(verifyToken, savedRecipesController.insert.insertOne)
	.delete(verifyToken, savedRecipesController.delete.deleteOne);
router.route("/user/:id").get(verifyToken, savedRecipesController.select.selectByUser);
router.route("/recipe/:id").get(verifyToken, savedRecipesController.select.selectByRecipe);

module.exports = router;
