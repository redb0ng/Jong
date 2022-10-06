const express = require("express");

const router = express.Router();
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/uploads");

const { userController } = require("../controller");

router.post("/api/users/login", userController.login.post);
router.post("/api/users/register", userController.register.post);
router.post("/api/users/secPw", userController.secPw.post);
router.post("/api/users/idcard", userController.idcard.post);

router.get("/api/users/logout", auth, userController.logout.get);
router.get("/api/users/auth", auth, userController.auth.get);

router.post(
  "/api/users/images",
  upload.single("image"),
  userController.images.post
);
router.get("/api/users/images", userController.images.get);

module.exports = router;
