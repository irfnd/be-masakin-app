const router = require("express").Router();
const { auth } = require("../../middlewares");
const { recipesController } = require("../../controllers");

router.route("/").get(auth.verifyToken, recipesController.select.selectByOwnerUser);

module.exports = router;
