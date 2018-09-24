const db_model = require('../../models/db_models');
const Article = require('../../models/article');

module.exports = {
    show: (db) => async (req, res) => {
        try {
            const article_id = (req.article || {}).id;
            if (!article_id) {
                res.status(404).send({message: 'Article not found'})
            } else {
                const Acticle = db_model(Article, db);
                const article = Acticle.findById(article_id);
                if (!article) {
                    res.status(404).send({message: 'Article not found'})
                } else {
                    res.status(200).json({data: article});
                }
            }

        } catch (e) {
            console.log('ERROR => ', e);
            res.status(500).send({message: e});
        }
    },
    showAll: (db) => async (req, res) => {
        try {
            const db_Article = db_model(Article, db);
            const articles = await db_Article.find();

            if (!articles) {
                res.status(404).send({message: 'Articles not found'})
            } else {
                res.status(200).json(articles);
            }

        } catch (e) {
            console.log('showAll => ERROR => ', e);
            res.status(500).send({message: e});
        }
    }
};