require('dotenv').config();
const mongoose = require('mongoose');


const Author = require('../models/author');
const Article = require('../models/article');
const db_model = require('../models/db_models');

const url_db = process.env.DATABASE_URL || "mongodb://localhost/blog";

mongoose.connect(url_db, function (err) {

    if (err) throw err;

    console.log('Successfully connected');

    // const data = {
    //     firstName: 'Ivan',
    //     lastName: 'Ivanov',
    //     biography: 'biography',
    //     twitter: 'twitter',
    //     facebook: 'facebook',
    //     linkedin: 'linkedin',
    // };

    //db_model(Author).create(data);
    //db_model(Author).fetch_all().then(res => console.log('1 res=> ', res));

    // db_model(Author).deleteOne({_id: '5ba8c7beb0240c057ba9c895'}).then( res => {
    //     console.log('res=>', res);
    // });
    // db_model(Author).deleteMany({}).then( res => {
    //     console.log('res=>', res);
    // });

    // db_model(Author).find().then(res => console.log('2 res=> ', res));
    //
    // db_model(Author).findById('5ba8cc0eb4263310dba24dd7').then(res => console.log('findById =>', res));

    // const jamieAuthor = new Author ({
    //     _id: new mongoose.Types.ObjectId(),
    //         name: {
    //             firstName: 'Jamie',
    //             lastName: 'Munro'
    //         },
    //         biography: 'Jamie is the author of ASP.NET MVC 5 with Bootstrap and Knockout.js.',
    //         twitter: 'https://twitter.com/endyourif',
    //         facebook: 'https://www.facebook.com/End-Your-If-194251957252562/'
    //     });
    //
    //     jamieAuthor.save(function(err) {
    //         if (err) throw err;
    //
    //     console.log('Author successfully saved.');
    //
    //     Author.find().exec(function(err, autors) {
    //         if (err) throw err;
    //
    //         console.log('autors => ', autors);
    //     });
    //
    //
    //
    //     // var mvcBook = new Book {
    //     //     _id: new mongoose.Types.ObjectId(),
    //     //         title: 'ASP.NET MVC 5 with Bootstrap and Knockout.js',
    //     //         author: jamieAuthor._id,
    //     //         ratings:[{
    //     //         summary: 'Great read'
    //     //     }]
    //     // };
    //     //
    //     // mvcBook.save(function(err) {
    //     //     if (err) throw err;
    //     //
    //     //     console.log('Book successfully saved.');
    //     // });
    //     //
    //     // var knockoutBook = new Book {
    //     //     _id: new mongoose.Types.ObjectId(),
    //     //         title: 'Knockout.js: Building Dynamic Client-Side Web Applications',
    //     //         author: jamieAuthor._id
    //     // };
    //     //
    //     // knockoutBook.save(function(err) {
    //     //     if (err) throw err;
    //     //
    //     //     console.log('Book successfully saved.');
    //     // });
    // });

});

module.exports = {
    mongoose,
}