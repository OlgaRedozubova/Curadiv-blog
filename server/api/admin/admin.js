const logger = require('heroku-logger');
const _ = require('lodash');
const db_model = require('../../models/db_models');
const Article = require('../../models/article');
const Podcast = require('../../models/podcast');

const something_wrong = (req, e) => {
    logger.error(`path:'${req.path}' api:user | Error: ` + e);
    return req.res.status(500).send({message: 'Something went wrong', message_code: '500', error: `${e}`}); //e.stack
};

module.exports = {
    //---/api/admin/article
    newArticle: (db) => async (req, res) => {
        try {
            const data = { ...req.body,
                splash: req.files.splash_f ? req.files.splash_f[0].key : '',
                image1: req.files.image1_f ? req.files.image1_f[0].key : '',
                image2: req.files.image2_f ? req.files.image2_f[0].key : ''};

            await archivedExistsArticle(db, data.slot, data._id);
            const db_Article = db_model(Article, db);
            const article = await db_Article.create(data);

            res.status(200).json(article);
        } catch (e) {
            something_wrong(req, e);
        }
    },
    //--/api/admin/article
    editArticle: (db) => async (req, res) => {
        try {
            const data = {...req.body};
            if (req.files.splash_f) {
                Object.assign(data, {splash: req.files.splash_f[0].key});
            } else {
                if (!data.splash) {Object.assign(data, {splash: ''});}
            }
            if (req.files.image1_f) {
                Object.assign(data, {image1: req.files.image1_f[0].key});
            } else {
                if (!data.image1) {Object.assign(data, {image1: ''});}
            }
            if (req.files.image2_f) {
                Object.assign(data, {image2: req.files.image2_f[0].key});
            } else {
                if (!data.image2) {Object.assign(data, {image2: ''});}
            }

            Object.assign(data, {
                edited: new Date()
            });

            logger.info(`article:edit: data =>(${JSON.stringify(data)}), req.body =>(${JSON.stringify(req.body)})`);

            await archivedExistsArticle(db, data.slot, data._id);
            const db_Article = db_model(Article, db);
            const article = await db_Article.update(data);

            res.status(200).json(article);
        } catch (e) {
            something_wrong(req, e);
        }
    },
    //--/api/admin/podcast--
    newPodcast: (db) => async (req, res) => {
        try {
            const data = { ...req.body,
                splash: req.files.splash_f ? req.files.splash_f[0].key : ''};

            await archivedExistsPodcast(db, data._id);
            const db_Podcast = db_model(Podcast, db);
            const podcast = await db_Podcast.create(data);
            res.status(200).json(podcast);
        } catch (e) {
            something_wrong(req, e);
        }
    },
    //---/api/admin/podcast
    editPodcast: (db) => async (req, res) => {
        try {
            const data = {...req.body};
            if (req.files.splash_f) {
                Object.assign(data, {splash: req.files.splash_f[0].key});
            } else {
                if (!data.splash) {Object.assign(data, {splash: ''});}
            }
            Object.assign(data, {
                edited: new Date()
            });
            logger.info(`podcast:edit: data =>(${JSON.stringify(data)}), req.body =>(${JSON.stringify(req.body)})`);
            await archivedExistsPodcast(db, data._id);
            const db_Podcast = db_model(Podcast, db);
            const podcast = await db_Podcast.update(data);
            res.status(200).json(podcast);
        } catch (e) {
            something_wrong(req, e);
        }
    },
    //---/api/admin/articles
    editArticles: (db) => async (req, res) => {
        try {
            const list = req.body.list;
            const type = req.body.type;

            switch (type) {
                case 'delete':
                    await articlesDelete(db, list);
                    break;
                case 'archive':
                    await articlesArchived(db, list, true);
                    break;
                case 'restore':
                    await articlesArchivedOne(db, list, false);
                    break;
                default: break;
            }

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
    //--/api/admin/articles
    showAll: (db) => async (req, res) => {
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
    }
};

const  articlesDelete = async(db, list) => {
    for (let i = 0; i < list.length; i++ ){
        if (list[i].isPodcast) {
            const db_Podcast = db_model(Podcast, db);
            await db_Podcast.deleteOne({_id: list[i]._id})
        } else {
            const db_Article = db_model(Article, db);
            await db_Article.deleteOne({_id: list[i]._id})
        }
    }
};

const  articlesArchivedOne = async(db, article, isArchived = false) => {

    if (article.isPodcast) {
        const data = {..._.omit(article, "isPodcast"), archived: isArchived};
        const db_Podcast = db_model(Podcast, db);

        await archivedExistsPodcast(db, data._id);
        await db_Podcast.update(data);

    } else {
        const data = {..._.omit(article, "isPodcast"), archived: isArchived};
        await archivedExistsArticle(db, data.slot, data._id);

        const db_Article = db_model(Article, db);
        await db_Article.update(data);
    }

};

const archivedExistsArticle = async(db, slot, _id='') => {
    const db_Article = db_model(Article, db);
    const obj = await db_Article.findOne({slot: slot, archived: false});
    if (obj){
        if (_id != obj._id) {
            obj.archived= true;
            await db_Article.update(obj);
        }
    }
};

const archivedExistsPodcast = async(db, _id) => {
    const db_Podcast = db_model(Podcast, db);
    const obj = await db_Podcast.findOne({archived: false});
    if (obj){
        if (_id != obj._id) {
            obj.archived = true;
            await db_Podcast.update(obj);
        }
    }
};

const  articlesArchived = async(db, list, isArchived = false) => {
    const db_Article = db_model(Article, db);
    const db_Podcast = db_model(Podcast, db);

    for (let i = 0; i < list.length; i++ ){
        if (list[i].isPodcast) {
            const data = {..._.omit(list[i], "isPodcast"), archived: isArchived};
            await db_Podcast.update(data);

        } else {
            const data = {..._.omit(list[i], "isPodcast"), archived: isArchived};
            await db_Article.update(data);
        }
    }
};

const getAllData = async (db) => {
    const db_Article = db_model(Article, db);
    const articles = await db_Article.find({archived: false});
    const archive = await db_Article.find({archived: true});

    const db_Podcast = db_model(Podcast, db);
    const podcast = await db_Podcast.find({archived: false});
    const archivePodcast = await db_Podcast.find({archived: true});

    return {articles, archive, podcast, archivePodcast}
};