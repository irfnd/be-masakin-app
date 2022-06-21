const router = require("express").Router();
const { recipesVideosController } = require("../controllers");

router.route("/").post(recipesVideosController.insert.insertOne);

router
  .route("/:id")
  .get(recipesVideosController.select.selectById)
  .patch(recipesVideosController.update.updateOne)
  .delete(recipesVideosController.delete.deleteOne);

router.route("/recipe/:id").get(recipesVideosController.select.selectByRecipe);

module.exports = router;
