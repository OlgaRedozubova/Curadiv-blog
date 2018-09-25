const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    subtitle: String,
    author: String,
    slot: Number,
    splash: String,
    image1: String,
    image2: String,
    body: String,
    deleted: Boolean,
    archived: Boolean,
    created: {
        type: Date,
        default: Date.now
    },
    edited:  {
        type: Date,
        default: Date.now
    },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;