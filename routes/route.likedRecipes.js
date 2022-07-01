const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth");
const { likedRecipesController } = require("../controllers");

router
	.route("/")
	.post(verifyToken, likedRecipesController.insert.insertOne)
	.delete(verifyToken, likedRecipesController.delete.deleteOne);
router.route("/user/:id").get(verifyToken, likedRecipesController.select.selectByUser);
router.route("/recipe/:id").get(verifyToken, likedRecipesController.select.selectByRecipe);

module.exports = router;
