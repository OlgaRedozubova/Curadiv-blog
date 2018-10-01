const mongoose = require('mongoose');
const logger = require('heroku-logger');

module.exports = function (table, db) {
    const create = (data) => {
        return new Promise(async(resolve, reject) => {
           const log_str = `[${table}:create(${JSON.stringify(data)}...)]`;
           try {
               const article = {
                   _id: new mongoose.Types.ObjectId(),
                   title: data.title,
                   subtitle: data.subtitle,
                   author: data.author,
                   slot: data.slot,
                   splash: data.splash,
                   image1: data.image1,
                   image2: data.image2,
                   body: data.body,
                   deleted: false,
                   archived: false,
               };
               table.create(article, function (err, obj) {
                   if (err) throw err;
                   //console.log('Article successfully saved.', obj);
                   logger.info(`${log_str} Article successfully saved.: ${JSON.stringify(obj)}`);
                   resolve(obj);
               });
           } catch (e) {
               logger.error(`${log_str} Error: ${e.stack}`);
               reject(e);
           }
        });
    };

    const update = (data) => {
        return new Promise(async(resolve, reject) => {
            const log_str = `[${table}:update(${JSON.stringify(data)}...)]`;
            try {
                table.findById(data._id, function(err, article){
                    if (err) throw err;

                    article.title = data.title;
                    article.subtitle = data.subtitle;
                    article.author = data.author;
                    article.slot = data.slot;
                    article.splash = data.splash;
                    article.image1 = data.image1;
                    article.image2 = data.image2;
                    article.body = data.body;
                    article.archived = data.archived;
                    article.deleted = data.deleted;

                    article.save(function(err, obj) {
                        if (err) throw err;
                        //console.log('Article successfully updated.',obj);
                        logger.info(`${log_str} Article successfully updated: ${JSON.stringify(obj)}`);
                        resolve(obj)
                    })
                });
            } catch (e) {
                logger.error(`${log_str} Error: ${e.stack}`);
                reject(e);
            }
        });
    };



    const find = (params = {}) => {
        return new Promise(async(resolve, reject) => {
           let log_str = `[${table}:find(${JSON.stringify(params)}...)]`;
           try {
               table.find(params).exec(function (err, list) {
                   if (err) throw err;
                   resolve(list)
               });
           } catch (e) {
               logger.error(`${log_str} Error: ${e.stack}`);
               reject(e);
           }
        });
    };

    const findById = (id) => {
        return new Promise(async(resolve, reject) => {
            let log_str = `[${table}:findById(${id})]`;
            try {
                table.findById(id)
                    .then(obj => resolve(obj))
                    .catch(err => reject(err));
            } catch (e) {
                logger.error(`${log_str} Error: ${e.stack}`);
                reject(e);
            }
        });
    };

    const deleteOne = (params = {}) => {
        return new Promise(async(resolve, reject) => {
            let log_str = `[${table}:find(${JSON.deleteOne(params)}...)]`;
            try {
                table.deleteOne(params, function (err, obj) {
                    if (err) throw err;
                    resolve(obj)
                });
            } catch (e) {
                logger.error(`${log_str} Error: ${e.stack}`);
                reject(e);
            }
        });
    };

    const deleteMany = (params = {}) => {
        return new Promise(async(resolve, reject) => {
            let log_str = `[${table}:find(${JSON.deleteMany(params)}...)]`;
            try {
                table.deleteMany(params, function (err, obj) {
                    if (err) throw err;
                    resolve(obj)
                });
            } catch (e) {
                logger.error(`${log_str} Error: ${e.stack}`);
                reject(e);
            }
        });
    };


    return {create, update, find,findById, deleteOne, deleteMany}
};