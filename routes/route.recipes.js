const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth");
const { recipesController } = require("../controllers");

router
	.route("/")
	.get(recipesController.select.selectAll)
	.post(verifyToken, recipesController.insert.insertOne);
router.route("/search").get(recipesController.select.selectByName);
router.route("/latest").get(recipesController.select.selectLatest);
router
	.route("/:id")
	.get(recipesController.select.selectById)
	.patch(verifyToken, recipesController.update.updateOne)
	.delete(verifyToken, recipesController.delete.deleteOne);
router.route("/user/:id").get(recipesController.select.selectByOwner);

module.exports = router;
