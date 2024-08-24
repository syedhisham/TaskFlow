const express = require("express");
const { registerUser } = require("../controllers/userController.js");
const upload = require("../middleware/multerMiddleware.js"); // Ensure this path is correct

const router = express.Router();

router.post("/register", 
    upload.fields([{ name: "avatar", maxCount: 1 }]), 
    registerUser
);

module.exports = router; // Correct export statement
