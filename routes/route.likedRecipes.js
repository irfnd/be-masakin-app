const router = require("express").Router();
const { auth } = require("../middlewares");
const { likedRecipesController } = require("../controllers");

router
	.route("/")
	.post(auth.verifyToken, likedRecipesController.insert.insertOne)
	.delete(auth.verifyToken, likedRecipesController.delete.deleteOne);
router.route("/user/:id").get(auth.verifyToken, likedRecipesController.select.selectByUser);
router.route("/recipe/:id").get(auth.verifyToken, likedRecipesController.select.selectByRecipe);

module.exports = router;
