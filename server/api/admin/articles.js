const logger = require('heroku-logger');
const db_model = require('../../models/db_models');
const Article = require('../../models/article');
const Podcast = require('../../models/podcast');

const something_wrong = (req, e) => {
    logger.error(`path:'${req.path}' api:user | Error: ` + e);
    return req.res.status(500).send({message: 'Something went wrong', message_code: '500', error: `${e}`}); //e.stack
};

module.exports = {
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
    editArticles: (db) => async (req, res) => {
        try {
            const list = req.body.list;
            const type = req.body.type;
            console.log('req.body => ', type, list);
            if (type === 'delete') {
                await articlesDelete(db, list, true);

                const data = await getAllData(db);

                if (!data.articles || !data.archive) {
                    res.status(404).send({message: 'Articles not found'})
                } else {
                    res.status(200).json(data);
                }
            }

        } catch (e) {
            something_wrong(req, e);
        }
    },
    showAllAdmin: (db) => async (req, res) => {
        try {

            const data = await getAllData(db);

            if (!data.articles || !data.archive) {
                res.status(404).send({message: 'Articles not found'})
            } else {
                res.status(200).json(data);
            }

        } catch (e) {
            something_wrong(req, e);
        }
    },

    restoreArchive: (db) => async(req, res) => {
        try {

            const article = {...req.body, archived: false};
            const db_Article = db_model(Article, db);
            await db_Article.update(article);

            const data = await getAllData(db);


            if (!data.articles || !data.archive) {
                res.status(404).send({message: 'Articles not found'})
            } else {
                res.status(200).json(data);
            }



        } catch (e) {
            something_wrong(req, e);
        }
    },

    addArchive: (db) => async(req, res) => {
        try {
            const list = req.body;
            console.log('req.body => ', req.body);

            await articlesArchived(db, list, true);

            const data = await getAllData(db);

            if (!data.articles || !data.archive) {
                res.status(404).send({message: 'Articles not found'})
            } else {
                res.status(200).json(data);
            }

        } catch (e) {
            something_wrong(req, e);
        }
    }
};

const  articlesDelete = async(db, list, isDeleted = false) => {
    const db_Article = db_model(Article, db);

    for (let i = 0; i < list.length; i++ ){
        const data = {...list[i], deleted: isDeleted};
        await db_Article.update(data);
    }
};

const  articlesArchived = async(db, list, isArchived = false) => {
    const db_Article = db_model(Article, db);

    for (let i = 0; i < list.length; i++ ){
        const data = {...list[i], archived: isArchived};
        await db_Article.update(data);
    }
};

const getAllData = async (db) => {
    const db_Article = db_model(Article, db);
    const articles = await db_Article.find({archived: false});
    const archive = await db_Article.find({archived: true});

    const db_Podcast = db_model(Podcast, db);
    const podcast = await db_Podcast.find({archived: false});

    return {articles, archive, podcast}
};