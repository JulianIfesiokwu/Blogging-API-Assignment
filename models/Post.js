const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    tags: {
        type: Array,
    },
    author: {
        type: String,
    },
    read_count: {
        type: Number,
        default: 0
    },
    reading_time: {
        type: String,
    },
    body: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);