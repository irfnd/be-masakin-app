const router = require("express").Router();
const { handlingAuth, cacheData } = require("../../middlewares");
const { upload } = require("../../middlewares/multer");
const { Recipes, LikedRecipes, SavedRecipes, CheckRecipes } = require("../../controllers");

router
	.route("/")
	.get(cacheData.byQuery("recipeAllPagination"), Recipes.findAllPagination)
	.post(handlingAuth.isLogin, upload("recipe_photo_", "photo-recipe", "photo"), Recipes.createFromUser);
router.route("/all").get(cacheData.all("recipeAll"), Recipes.findAll);
router.route("/new").get(cacheData.all("recipeAllPagination"), Recipes.findAllPagination);
router.route("/popular").get(cacheData.all("recipeAllPopular"), Recipes.findAllPopular);
router.route("/liked").get(handlingAuth.isLogin, cacheData.byUser("likedRecipeAll"), LikedRecipes.findAllFromUser);
router
	.route("/liked/:id")
	.post(handlingAuth.isLogin, LikedRecipes.createFromUser)
	.delete(handlingAuth.isLogin, LikedRecipes.deleteFromUser);
router.route("/saved").get(handlingAuth.isLogin, cacheData.byUser("savedRecipeAll"), SavedRecipes.findAllFromUser);
router
	.route("/saved/:id")
	.post(handlingAuth.isLogin, SavedRecipes.createFromUser)
	.delete(handlingAuth.isLogin, SavedRecipes.deleteFromUser);
router.route("/mine").get(handlingAuth.isLogin, cacheData.byUser("recipeMine"), Recipes.findAllMyRecipes);
router
	.route("/mine/:id")
	.patch(handlingAuth.isLogin, upload("recipe_photo_", "photo-recipe", "photo"), Recipes.updateFromUser)
	.delete(handlingAuth.isLogin, Recipes.deleteFromUser);
router.route("/check/:id").get(handlingAuth.isLogin, cacheData.byUser("checkRecipe"), CheckRecipes.check);
router.route("/:id").get(cacheData.byId("recipe"), Recipes.findOne);

module.exports = router;
