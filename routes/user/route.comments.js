const router = require("express").Router();
const { handlingAuth } = require("../../middlewares");
const { Comments } = require("../../controllers");

router.route("/").post(handlingAuth.isLogin, Comments.createFromUser);

module.exports = router;
