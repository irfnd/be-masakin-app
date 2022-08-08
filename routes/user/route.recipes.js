const router = require("express").Router();
const { handlingAuth } = require("../../middlewares");
const { upload } = require("../../middlewares/multer");
const { Recipes, LikedRecipes, SavedRecipes, CheckRecipes } = require("../../controllers");

router
	.route("/")
	.get(Recipes.findAllPagination)
	.post(handlingAuth.isLogin, upload("recipe_photo_", "photo-recipe", "photo"), Recipes.createFromUser);
router.route("/all").get(Recipes.findAll);
router.route("/popular").get(Recipes.findAllPopular);
router.route("/liked").get(handlingAuth.isLogin, LikedRecipes.findAllFromUser);
router
	.route("/liked/:id")
	.post(handlingAuth.isLogin, LikedRecipes.createFromUser)
	.delete(handlingAuth.isLogin, LikedRecipes.deleteFromUser);
router.route("/saved").get(handlingAuth.isLogin, SavedRecipes.findAllFromUser);
router
	.route("/saved/:id")
	.post(handlingAuth.isLogin, SavedRecipes.createFromUser)
	.delete(handlingAuth.isLogin, SavedRecipes.deleteFromUser);
router.route("/mine").get(handlingAuth.isLogin, Recipes.findAllMyRecipes);
router.route("/check/:id").get(handlingAuth.isLogin, CheckRecipes.check);
router.route("/:id").get(Recipes.findOne);

module.exports = router;
