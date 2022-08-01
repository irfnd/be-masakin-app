const router = require("express").Router();
const { Comments } = require("../../controllers");

router.route("/").get(Comments.findAll).post(Comments.createOne);
router.route("/:id").get(Comments.findOne).patch(Comments.updateOne).delete(Comments.deleteOne);

module.exports = router;
