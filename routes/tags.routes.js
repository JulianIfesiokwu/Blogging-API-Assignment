const router = require("express").Router();
const Tag = require("../models/tags");

router.post("/", async (req, res) => {
    const newTag = new Tag(req.body);
    try {
        const savedTag = await newTag.save();
        res.status(200).json(savedTag);
    } catch (error) {
        res.status(500).json(error);
    };
});

router.get("/", async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json(error);
    };
});

module.exports = router;

