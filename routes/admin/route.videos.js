const router = require("express").Router();
const { Videos } = require("../../controllers");

router.route("/").get(Videos.findAll).post(Videos.createOne);
router.route("/recipe/:id").get(Videos.findAllByRecipe);
router.route("/:id").get(Videos.findOne).patch(Videos.updateOne).delete(Videos.deleteOne);

module.exports = router;
