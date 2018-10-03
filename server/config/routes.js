require('dotenv').config();
const logger = require('heroku-logger');
const express = require('express');
const articles = require('../api/article/article');
const admin_articles = require('../api/admin/articles');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../react-ui/src/assets/images'));
    },
    filename: (req, file, cb) => {
         //const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        const newFilename = file.originalname;
        cb(null, newFilename);
    }
})

const upload = multer({ storage });

module.exports = (app, db) => {
    app.get('/api/articles', articles.showAll(db));
    app.get("/api/articles/:id", articles.show(db));

    app.get('/api/admin/articles', admin_articles.showAllAdmin(db));
    app.post('/api/admin/articles', admin_articles.editArticles(db));


    app.post("/api/admin/article", upload.fields([{ name: 'splash_f', maxCount: 1 }, { name: 'image1_f', maxCount: 1 }, { name: 'image2_f', maxCount: 1 }]),
        admin_articles.new(db));
    app.put("/api/admin/article", upload.fields([
        { name: 'splash_f', maxCount: 1 },
        { name: 'image1_f', maxCount: 1 },
        { name: 'image2_f', maxCount: 1 }]), admin_articles.edit(db));
    //--------------------------------------------------------


    const react_routes = [
        '/', '/admin', '/article-edit/:id', '/login', '/article/:id',
    ];
    const mainHtmlMaxAge = 5 * 60 * 1000; //15 min
    const send_react_index = (request, response) => response.sendFile(path.resolve(__dirname, '../../react-ui/build', 'index.html'), {
        maxAge: mainHtmlMaxAge,
        's-maxage': mainHtmlMaxAge
    });

    for (let i = 0; i < react_routes.length; i++) {
        app.get(react_routes[i], send_react_index)
    }
    const staticMaxAge = 60 * 1000 * 60 * 6; //6 hours
    app.use(express.static(path.resolve(__dirname, '../../react-ui/build'),{ maxAge: staticMaxAge,  's-maxage': staticMaxAge }));

    app.get('*', 			send_react_index);
};
