const router = require("express").Router();

router.use("/users", require("./route.users"));
router.use("/recipes", require("./route.recipes"));
router.use("/comments", require("./route.comments"));
router.use("/videos", require("./route.videos"));

module.exports = router;
