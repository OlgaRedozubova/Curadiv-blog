const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    subtitle: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    slot: Number,
    body: String,
    deleted: Boolean,
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