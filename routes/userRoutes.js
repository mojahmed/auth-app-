const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyJWT = require("../middleware/verifyJWT");



router.use(verifyJWT);//to verify if user in my db and after go to next 
router.route("/").get(usersController.getAllUsers)//i should verify it first before i set the route

module.exports = router;