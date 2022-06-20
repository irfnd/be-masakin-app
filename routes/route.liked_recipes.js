const router = require("express").Router();
const { likedRecipesController } = require("../controllers");

router
  .route("/")
  .post(likedRecipesController.insert.insertOne)
  .delete(likedRecipesController.delete.deleteOne);

router.route("/user").get(likedRecipesController.select.selectByUser);

router.route("/recipe").get(likedRecipesController.select.selectByRecipe);

module.exports = router;
