const logger = require('heroku-logger');
const db_model = require('../../models/db_models');
const Article = require('../../models/article');
const Podcast = require('../../models/podcast');


const something_wrong = (req, e) => {
    logger.error(`path:'${req.path}' api:user | Error: ` + e);
    return req.res.status(500).send({message: 'Something went wrong', message_code: '500', error: `${e}`}); //e.stack
};

module.exports = {
    show: (db) => async (req, res) => {
        try {
            const article_id = req.params.id;

            if (!article_id) {
                res.status(404).send({message: 'Article not found'})
            } else {
                const Acticle = db_model(Article, db);
                const article = await Acticle.findById(article_id);
                if (!article) {
                    const msg = `Article with id: '${article_id}' not found`;
                    logger.warn(msg);
                    res.status(404).send({message: msg})
                } else {
                    logger.info(`article:show: (${JSON.stringify(article)})`);
                    res.status(200).json(article);
                }
            }

        } catch (e) {
            something_wrong(req, e);
        }
    },
    showAll: (db) => async (req, res) => {
        try {
            const db_Article = db_model(Article, db);
            const articles = await db_Article.find({archived: false});

            const db_Podcast = db_model(Podcast, db);
            const podcast = await db_Podcast.find({archived: false});

            if (!articles) {
                res.status(404).send({message: 'Articles not found'})
            } else {
                res.status(200).json({articles, podcast});
            }

        } catch (e) {
            something_wrong(req, e);
        }
    },
};