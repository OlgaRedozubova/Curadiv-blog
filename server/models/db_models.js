const mongoose = require('mongoose');

module.exports = function (table, db) {
    const create = (data) => {
        return new Promise(async(resolve, reject) => {
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
                   console.log('Article successfully saved.', obj);
                   resolve(obj);
               });
           } catch (e) {
               console.log('ERROR=>', e);
               reject(e);
           }
        });
    };

    const update = (data) => {
        return new Promise(async(resolve, reject) => {
            try {
                table.findById(data.id, function(err, atricle){
                    if (err) throw err;

                    article.title = data.title;
                    article.subtitle = data.subtitle;
                    article.author = data.author;
                    article.slot = data.slot;
                    article.splash = data.splash;
                    article.image1 = data.image1;
                    article.image2 = data.image2;
                    article.body = data.body;

                    atricle.save(function(err, obj) {
                        if (err) throw err;
                        console.log('Article successfully updated.', obj);
                        resolve(obj)
                    })
                });
            } catch (e) {
                console.log('ERROR=>', e);
                reject(e);
            }
        });
    };

    const find = (params = {}) => {
        return new Promise(async(resolve, reject) => {
           try {
               table.find(params).exec(function (err, list) {
                   if (err) throw err;
                   resolve(list)
               });
           } catch (e) {
               console.log('ERROR=>', e);
               reject(e);
           }
        });
    };

    const findById = (id) => {
        return new Promise(async(resolve, reject) => {
            try {
                table.findById(id)
                    .then(obj => resolve(obj))
                    .catch(err => reject(err));
            } catch (e) {
                console.log('ERROR=>', e);
                reject(e);
            }
        });
    };

    const deleteOne = (params = {}) => {
        return new Promise(async(resolve, reject) => {
            try {
                table.deleteOne(params, function (err, obj) {
                    if (err) throw err;
                    resolve(obj)
                });
            } catch (e) {
                console.log('ERROR=>', e);
                reject(e);
            }
        });
    };

    const deleteMany = (params = {}) => {
        return new Promise(async(resolve, reject) => {
            try {
                table.deleteMany(params, function (err, obj) {
                    if (err) throw err;
                    resolve(obj)
                });
            } catch (e) {
                console.log('ERROR=>', e);
                reject(e);
            }
        });
    };


    return {create, update, find,findById, deleteOne, deleteMany}
};