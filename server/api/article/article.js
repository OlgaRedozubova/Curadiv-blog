const db_model = require('../../models/db_models');
const Article = require('../../models/article');
const fs = require('fs-extra');
const path = require('path');

// //------------
// const multer = require('multer');
// const uuidv4 = require('uuid/v4');
// const path = require('path');
//
// //const upload = multer({dest: 'uploads/'});
//
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//
//         //if (process.env.NODE_ENV === 'production')
//         //path.resolve(__dirname, '../../react-ui/src/assets/images')
//         // cb(null, './uploads');
//         cb(null, path.resolve(__dirname, '../../react-ui/src/assets/images'));
//     },
//     filename: (req, file, cb) => {
//         const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
//         cb(null, newFilename);
//     }
// })
//
// const upload = multer({ storage });
// //------------


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
                    res.status(404).send({message: 'Article not found'})
                } else {
                    console.log('article=>', article);
                    res.status(200).json(article);
                }
            }

        } catch (e) {
            console.log('ERROR => ', e);
            res.status(500).send({message: e});
        }
    },
    new: (db) => async (req, res) => {
        try {
            const data = { ...req.body,
                splash: req.files.splash ? req.files.splash[0].filename : '',
                image1: req.files.image1 ? req.files.image1[0].filename : '',
                image2: req.files.image2 ? req.files.image2[0].filename : ''};
            //console.log('NEW => form=>', data);

            const db_Article = db_model(Article, db);
            const article = await db_Article.create(data);
            //res.status(200).json({message: 'User was successfully created.', message_code: 'user_created'});
            res.status(200).json(article);
        } catch (e) {
            console.log('ERROR => ', e);
            res.status(500).send({message: e});
        }
    },
    edit: (db) => async (req, res) => {
        try {
            //const id = req.body.id;
            const data = {...req.body,
                splash: req.files.splash ? req.files.splash[0].filename : '',
                image1: req.files.image1 ? req.files.image1[0].filename : '',
                image2: req.files.image2 ? req.files.image2[0].filename : ''};
            console.log('PUT => ',data, req.body);

            const db_Article = db_model(Article, db);
            const article = await db_Article.update(data);
            //res.status(200).json({message: 'User was successfully created.', message_code: 'user_created'});
            res.status(200).json(article);
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