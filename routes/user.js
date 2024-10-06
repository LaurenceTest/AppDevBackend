const express = require("express")
const authenticateToken = require("../middleware/authMiddleware")
const validateInput = require("../middleware/validationMiddleware.js")
const router = express.Router()
const UserController = require("../controllers/userController.js")


router.post("/register",validateInput,UserController.register)
router.post("/login",validateInput,UserController.login)
router.get("/profile",authenticateToken,UserController.getProfile)
//Catches any other routes
router.all('/',(req,res)=>res.sendStatus(404))

module.exports = router;