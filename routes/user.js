const express = require("express")
const {validateInput,authenticateToken} = require("../middleware/authMiddleware")
const router = express.Router()
const UserController = require("../controllers/userController.cjs")


router.post("/register",validateInput,UserController.register)
router.post("/login",validateInput,UserController.login)
router.get("/profile",authenticateToken,UserController.getProfile)

module.exports = router;