const router = require("express").Router();
const { savedRecipesController } = require("../controllers");

router
  .route("/")
  .post(savedRecipesController.insert.insertOne)
  .delete(savedRecipesController.delete.deleteOne);

router.route("/user/:id").get(savedRecipesController.select.selectByUser);

router.route("/recipe/:id").get(savedRecipesController.select.selectByRecipe);

module.exports = router;
