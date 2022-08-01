const router = require("express").Router();

router.use("/users", require("./route.users"));
router.use("/recipes", require("./route.recipes"));
router.use("/comments", require("./route.comments"));

module.exports = router;
