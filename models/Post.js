const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    tags: {
        type: Array,
    },
    author: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    read_count: {
        type: Number,
    },
    reading_time: {
        type: Number,
    },
    state: {
        type: String,
    },
    body: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);