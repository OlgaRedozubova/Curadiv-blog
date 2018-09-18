//const _ = require('lodash');
//const Path = require('path-parser');
//const { URL } = require('url');
const mongoose = require('mongoose');
//const articleTemplate = require('../templates/articleTemplate');

const Article = mongoose.model('articles');

module.exports = app => {
    app.get('/api/articles', async (req, res) => {
      const articles = await Article.find({})   // empty object dumps the whole database
        //.select({recipients: false});
        res.send(articles);
    });

    app.post('/api/articles', async (req, res) => {
        const { title, subtitle, markDown, datePosted } = req.body;

        const article = new Article({
            title,
            subtitle,
            markDown,
            //recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            //_user: req.user.id,
            datePosted: Date.now()
        });
        article.save();
    });
}