require('dotenv').config();
const articles = require('../api/article/article');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../react-ui/src/assets/images'));
    },
    filename: (req, file, cb) => {
         //const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        const newFilename = file.originalname;
        cb(null, newFilename);
    }
})

const upload = multer({ storage });

module.exports = (app, db) => {
    app.get('/api/articles', articles.showAll(db));
    app.get("/api/articles/:id", articles.show(db));
    app.post("/api/articles", upload.fields([{ name: 'splash_f', maxCount: 1 }, { name: 'image1_f', maxCount: 1 }, { name: 'image2_f', maxCount: 1 }]), articles.new(db));
    app.put("/api/articles", upload.fields([
        { name: 'splash_f', maxCount: 1 },
        { name: 'image1_f', maxCount: 1 },
        { name: 'image2_f', maxCount: 1 }]), articles.edit(db));
};
