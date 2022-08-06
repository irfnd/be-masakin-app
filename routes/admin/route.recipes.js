const router = require("express").Router();
const { Recipes, LikedRecipes, SavedRecipes } = require("../../controllers");

router.route("/").get(Recipes.findAllPagination).post(Recipes.createOne);
router.route("/all").get(Recipes.findAll);
router.route("/popular").get(Recipes.findAllPopular);
router.route("/liked").get(LikedRecipes.findAll).post(LikedRecipes.createOne).delete(LikedRecipes.deleteOne);
router.route("/saved").get(SavedRecipes.findAll).post(SavedRecipes.createOne).delete(SavedRecipes.deleteOne);
router.route("/:id").get(Recipes.findOne).patch(Recipes.updateOne).delete(Recipes.deleteOne);

module.exports = router;
