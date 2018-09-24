const mongoose = require('mongoose');

module.exports = function (table, db) {
    //
    const create = (data) => {
        const row = new table ({
            _id: new mongoose.Types.ObjectId(),
            name: {
                firstName: data.firstName,
                lastName: data.lastName
            },
            biography: data.biography,
            twitter: data.twitter,
            facebook: data.facebook
        });
        row.save(function(err) {
            if (err) throw err;

            console.log('Author successfully saved.');
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


    return {create, find,findById, deleteOne, deleteMany}
};