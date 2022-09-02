const router = require("express").Router();
const { Users } = require("../../controllers");

router.route("/").get(Users.findAll).post(Users.createOne);
router.route("/:id").get(Users.findOne).patch(Users.updateOne).delete(Users.deleteOne);

module.exports = router;
