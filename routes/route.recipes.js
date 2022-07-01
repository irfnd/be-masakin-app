const router = require("express").Router();
const { auth } = require("../middlewares");
const { recipesController } = require("../controllers");

router.route("/").get(recipesController.select.selectAll).post(auth.verifyToken, recipesController.insert.insertOne);
router.route("/search").get(recipesController.select.selectByName);
router.route("/latest").get(recipesController.select.selectLatest);
router
	.route("/:id")
	.get(recipesController.select.selectById)
	.patch(auth.verifyToken, recipesController.update.updateOne)
	.delete(auth.verifyToken, recipesController.delete.deleteOne);
router.route("/user/:id").get(recipesController.select.selectByOwner);

module.exports = router;
