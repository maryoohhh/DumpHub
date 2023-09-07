const express = require("express");
const router = express.Router();

// controllers
const { test, signup, signin, forgotPassword, resetPassword, uploadImage, updatePassword } = require("../controllers/auth");
const { restrooms } = require("../controllers/map")

router.get("/", (req, res) => {
    return res.json({
        data: "hello world from the API",
    });
});

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/upload-image", uploadImage);
router.post("/update-password", updatePassword);
router.get("/restrooms", restrooms);

// router.get("/Restroom-WA", restrooms);

module.exports = router;
