const router = require("express").Router();
const postController = require('../controllers/postController')

// Create New Post
router.post("/create-new", postController.createPost);

// Update Post
router.put("/:id", postController.updatePost);

// Delete Post
router.delete("/:id", postController.deletePost);

// Get a Post
router.get("/:id", postController.getAPost);

// get all posts
router.get("/", postController.getAllPosts);

module.exports = router