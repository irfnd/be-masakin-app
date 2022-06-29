const router = require("express").Router();
const { likedRecipesController } = require("../controllers");

router.route("/").post(likedRecipesController.insert.insertOne);
router.route("/:id").delete(likedRecipesController.delete.deleteOne);
router.route("/user/:id").get(likedRecipesController.select.selectByUser);
router.route("/recipe/:id").get(likedRecipesController.select.selectByRecipe);

module.exports = router;
