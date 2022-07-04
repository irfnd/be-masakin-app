const router = require("express").Router();
const { auth } = require("../../middlewares");
const { likedRecipesController } = require("../../controllers");

router.route("/").get(auth.verifyToken, likedRecipesController.select.selectByUser);

module.exports = router;
