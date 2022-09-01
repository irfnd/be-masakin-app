const router = require("express").Router();
const { handlingAuth, cacheData } = require("../../middlewares");
const { upload } = require("../../middlewares/multer");
const { Users, PhotoProfile } = require("../../controllers");

router
	.route("/")
	.get(handlingAuth.isLogin, cacheData.byUser("profile"), Users.findFromUser)
	.patch(handlingAuth.isLogin, Users.updateFromUser)
	.delete(handlingAuth.isLogin, Users.deleteFromUser);
router
	.route("/photo")
	.post(handlingAuth.isLogin, upload("user_photo_", "photo-profile", "photo"), PhotoProfile.uploadPhoto)
	.delete(handlingAuth.isLogin, PhotoProfile.deletePhoto);
module.exports = router;
