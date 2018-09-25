require('dotenv').config();
const articles = require('../api/article/article');

module.exports = (app, db) => {
    app.get('/api/articles', articles.showAll(db));
    app.get("/api/articles/:id", articles.show(db));
    app.post("/api/articles", articles.new(db));
    // app.delete("/api/articles/:id", articles.new(db));
    // app.put("/api/articles", articles.edit(db));

    // app.use(function(err, req, res, next) {
    // 	logger.info(`error ${JSON.stringify(err)}`);
    // 	next();
    // });
};
