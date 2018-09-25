require('dotenv').config();
const mongoose = require('mongoose');

const url_db = process.env.DATABASE_URL || "mongodb://localhost/blog2";

mongoose.connect(url_db, function (err) {

    if (err) throw err;

    console.log('Successfully connected');

});

module.exports = {
    mongoose,
}