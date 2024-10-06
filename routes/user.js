const express = require("express")
const bodyParser = require("body-parser").json()
const {validateInput} = require("../middleware/authMiddleware")
const router = express.Router()
const UserController = require("../controllers/userController.cjs")


router.post("/register",bodyParser,validateInput,UserController.register)
router.post("/login",bodyParser,validateInput,UserController.login)
router.get("/profile",UserController.getProfile)

module.exports = router;