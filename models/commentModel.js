
const mongoose = require('mongoose');
const { Schema } = mongoose;

//subdoc of article

const commentSchema = new Schema({
    articleId: Number,
    userId: Number,
    parentCommentId: Number,
    lastEdited: Number,
    title: String,
    markDown: String,
    renderedHtml: String,
    numVotes: Number,
    deleted: Boolean,
    flags: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    datePosted: Date,
    lastEdited: Date
});


module.exports = commentSchema;