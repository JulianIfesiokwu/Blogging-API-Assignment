const router = require("express").Router();
const Post = require("../models/Post");
const authenticationMiddleware = require("../middleware/authUser");
const postController = require('../controllers/postController')

// Create New Post
router.post("/create-new", postController.createDraft);

// Update Post
router.put("/:id", postController.updatePost);

// Delete Post
router.delete("/:id", postController.deletePost);

// Get a Post
router.get("/:id", postController.getAPost);

// get all posts, also get all posts by author, title or tags
router.get("/", postController.getAllPosts);

module.exports = router