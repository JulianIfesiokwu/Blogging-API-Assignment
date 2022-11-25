const User = require('../models/User');
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const { title, body, description, tags, email } = req.body;
        const reading_time = body.split(' ').length / 200 +' ' + 'mins'
        const userId = email

        const post = new Post({
            title,
            description,
            tags,
            body,
            reading_time,
            author: userId            
        })
        const savedPost = await post.save();
        res.status(200).json({msg: "Post created successfully",savedPost});
    } catch (error) {
        res.status(500).json({error});
    }
};

exports.updatePost = async (req, res) => {
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
};

exports.deletePost = async (req, res) => {
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
};

exports.getAPost = async (req, res) => {
    try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getAllPosts = async (req, res) => {
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
}