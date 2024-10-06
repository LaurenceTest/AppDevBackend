const express = require("express")
const bodyParser = require("body-parser").json()
const router = express.Router()
const UserController = require("../controllers/userController.cjs")


router.post("/register",bodyParser,UserController.register)
router.post("/login",bodyParser,UserController.login)
router.get("/profile",UserController.getProfile)

module.exports = router;