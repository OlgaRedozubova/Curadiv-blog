const mongoose = require('mongoose');
const { Schema } = mongoose;
const commentModel = require('./commentModel');

const articleSchema = new Schema({
    articleId: Number,
    userId: Number,
    lastEdited: Number,
    title: String,
    subtitle: String,
    author: String,
    markDown: String,
    renderedHtml: String,
    numVotes: Number,
    deleted: Boolean,
    flags: String,
    comments: [commentModel],
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    datePosted: Date,
    lastEdited: Date
  });
  
  var articles = mongoose.model('articles', articleSchema);