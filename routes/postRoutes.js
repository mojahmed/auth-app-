// routes/postRoutes.js
const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const verifyJWT = require("../middleware/verifyJWT");
// const { protect } = require('../middleware/protect');

router.use(verifyJWT); // to Ensure user is authenticated

router.route("/")
    .post(postsController.createPost) 
    .get(postsController.getAllPosts); 

router.route("/:id")
    .put(postsController.updatePostContent) 
    .delete(postsController.deletePost); 

module.exports = router;
