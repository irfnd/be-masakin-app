const router = require("express").Router();
const { commentsController } = require("../controllers");

router
  .route("/")
  .get(commentsController.select.selectAll)
  .post(commentsController.insert.insertOne);

router
  .route("/:id")
  .get(commentsController.select.selectById)
  .patch(commentsController.update.updateOne)
  .delete(commentsController.delete.deleteOne);

router.route("/recipe/:id").get(commentsController.select.selectByRecipe);

module.exports = router;
