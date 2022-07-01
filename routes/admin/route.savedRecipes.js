const router = require("express").Router();
const { auth } = require("../../middlewares");
const { savedRecipesController } = require("../../controllers");

router
	.route("/")
	.post(auth.verifyToken, savedRecipesController.insert.insertOne)
	.delete(auth.verifyToken, savedRecipesController.delete.deleteOne);
router.route("/user/:id").get(auth.verifyToken, savedRecipesController.select.selectByUser);
router.route("/recipe/:id").get(auth.verifyToken, savedRecipesController.select.selectByRecipe);

module.exports = router;
