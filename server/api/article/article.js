const logger = require('heroku-logger');
const db_model = require('../../models/db_models');
const Article = require('../../models/article');

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
                    const msg = `User with id: '${article_id}' not found`;
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
    new: (db) => async (req, res) => {
        try {
            const data = { ...req.body,
                splash: req.files.splash_f ? req.files.splash_f[0].filename : '',
                image1: req.files.image1_f ? req.files.image1_f[0].filename : '',
                image2: req.files.image2_f ? req.files.image2_f[0].filename : ''};

            const db_Article = db_model(Article, db);
            const article = await db_Article.create(data);
            res.status(200).json(article);
        } catch (e) {
            something_wrong(req, e);
        }
    },
    edit: (db) => async (req, res) => {
        try {

            const data = {...req.body,
                splash: req.files.splash_f ? req.files.splash_f[0].filename : '',
                image1: req.files.image1_f ? req.files.image1_f[0].filename : '',
                image2: req.files.image2_f ? req.files.image2_f[0].filename : ''};

            logger.info(`article:edit: data =>(${JSON.stringify(data)}), req.body =>(${JSON.stringify(req.body)})`);
            const db_Article = db_model(Article, db);
            const article = await db_Article.update(data);

            res.status(200).json(article);
        } catch (e) {
            something_wrong(req, e);
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
            something_wrong(req, e);
        }
    }
};