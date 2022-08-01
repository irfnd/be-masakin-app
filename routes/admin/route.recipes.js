const router = require("express").Router();
const { Recipes, LikedRecipes, SavedRecipes } = require("../../controllers");

router.route("/").get(Recipes.findAll).post(Recipes.createOne);
router.route("/liked").get(LikedRecipes.findAll).post(LikedRecipes.createOne).delete(LikedRecipes.deleteOne);
router.route("/saved").get(SavedRecipes.findAll).post(SavedRecipes.createOne).delete(SavedRecipes.deleteOne);
router.route("/:id").get(Recipes.findOne).patch(Recipes.updateOne).delete(Recipes.deleteOne);

module.exports = router;
