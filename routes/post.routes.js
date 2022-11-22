const router = require("express").Router();
const Post = require("../models/Post");
const authenticationMiddleware = require("../middleware/authUser");

// Create New Post
router.post("/create-new", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json({msg: "Post created successfully",savedPost});
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update Post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set:req.body,}, {new:true});
                res.status(200).json({msg: "Post updated!", updatedPost});
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(401).json("You can only update your posts!")
        };
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete Post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted!");
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(401).json("You can only delete your posts!")
        };
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get a Post
router.get("/:id", async (req, res) => {
    try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get all posts, also get all posts by author, title or tags
router.get("/", async (req, res) => {
    const author = req.query.author;
    const tag = req.query.tag;
    const page = req.query.page;
    const limit = 20;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    try {
        let posts, resultPosts;
        if (author) {
            posts = await Post.find({author});
            resultPosts = await posts.slice(startIndex, endIndex);
        } else if (title) {
            posts = await Post.find({title});
            resultPosts = await posts.slice(startIndex, endIndex);
        } else if (tag) {
            posts = await Post.find({
                tags: {
                    $in: [tag]
                }
            })
            resultPosts= await posts.slice(startIndex, endIndex);
        } else {
            resultPosts = await Post.find()
        }
        res.status(200).json(resultPosts)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router