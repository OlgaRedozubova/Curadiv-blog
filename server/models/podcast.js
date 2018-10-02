const mongoose = require('mongoose');

const podcastSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: String,
    splash: String,
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

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;