const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");

// Update User
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(400).json("You can only update your account");
    }
});

// delete User
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findbyId(req.params.id);
            try {
                // delete all posts by the user
                await Post.deleteMany({email: user.email});
                // delete user
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted")
            } catch (error) {
            res.status(500).json(error)
            }
        } catch (error) {
            res.status(400).json("User not found");
        }

    } else {
        res.status(400).json("You can only delete your account");
    }
});

// get one user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);

    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router