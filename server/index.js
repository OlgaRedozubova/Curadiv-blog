require('dotenv').config();
const express = require('express');
const passport = require('passport');



// const mongoose = require('mongoose');
const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const bodyParser = require('body-parser');
const config = require('./config/database');

const app = express();
const jsonParser = bodyParser.json();


// mongoose.connect(config.DB, { useNewUrlParser: true }).then(
//     () => {console.log('Database is connected') },
//     err => { console.log('Can not connect to the database'+ err)}
// );
const url_db = "mongodb://localhost:27017/blog";

app.use(express.static(__dirname + "../public"));


// let articles = [
//     {title: "title1", subtitle: "subtitle1", author: "ivan", body: "body1"},
//     {title: "title2", subtitle: "subtitle2", author: "roman", body: "body2"},
//     {title: "title3", subtitle: "subtitle3", author: "nik", body: "body3"},
// ];
//
// mongoClient.connect(url_db, function(err, client){
//     const db = client.db("blog");
//     const collection = db.collection("articles");
//     // let article = {title: "title1", subtitle: "subtitle", author: "ivan", body: "body"};
//     // collection.insertOne(article, function(err, result) {
//     //     if(err) {
//     //         return console.log(err);
//     //     }
//     //     console.log(result.ops);
//     //     client.close();
//     // });
//
//     collection.insertMany(articles, function(err, result) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log(result.ops);
//         client.close();
//     });
//
//     if (err) return console.log(err);
//
//     collection.find().toArray(function(err, results){
//         console.log(results);
//         client.close();
//     });
//     const col = db.collection("articles");
//
//     col.findOneAndUpdate(
//         {title: "title1"},              // критерий выборки
//         { $set: {title: "title_1"}},     // параметр обновления
//         {                           // доп. опции обновления
//             returnOriginal: false
//         },
//         function(err, result){
//
//             console.log(result);
//             client.close();
//         }
//     );
//     // db.collection("articles").drop(function (err, result) {
//     //     console.log(result);
//     //     client.close();
//     // })
// });


app.get("/api/articles", function (req, res) {
    mongoClient.connect(url_db, function (err, client) {


//     collection.find().toArray(function(err, results){
//         console.log(results);
//         client.close();
//     });

        client.db("blog").collection("articles").find().toArray(function (err, articles) {

            res.send(articles);
            client.close();
        })
    })
});

app.get("/api/articles/:id", function (req, res) {
    var id = new objectId(req.params.id);
    mongoClient.connect(url_db, function (err, client) {
        client.db("blog").collection("articles").findOne({_id: id}, function (err, article) {
            if (err) return res.status(400).send();

            res.send(article);
            client.close();
        })
    })
});

app.post("/api/articles", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    var art_title = req.body.title;
    var art_subtitle = req.body.subTitle;
    var art_author = req.body.author;
    var art_body = req.body.body;
    var user = {title: art_title, subTitle: art_subtitle, author: art_subtitle, body: art_body};

    mongoClient.connect(url, function(err, client){
        client.db("blog").collection("articles").insertOne(article, function(err, result){

            if(err) return res.status(400).send();

            res.send(user);
            client.close();
        });
    });
});

app.delete("/api/articles/:id", function (req, res) {

   var id = new objectId(req.params.id);
    mongoClient.connect(url_db, function (err, client) {
        client.db("blog").collection("articles").findOneAndDelete({_id: id}, function (err, article) {
            if (err) return res.status(400).send();

            var article = result.value;

            res.send(article);
            client.close();
        })
    })
});

app.put("/api/articles", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    var id = new objectId(req.body.id);
    var art_title = req.body.title;
    var art_subtitle = req.body.subTitle;

    mongoClient.connect(url, function(err, client){
        client.db("blog").collection("articles").findOneAndUpdate({_id: id}, { $set: {title: art_title, subTitle: art_subtitle}},
            {returnOriginal: false },function(err, result){

                if(err) return res.status(400).send();

                var user = result.value;
                res.send(user);
                client.close();
            });
    });
});


// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./config/routes')(app, passport);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
