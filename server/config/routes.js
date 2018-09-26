require('dotenv').config();
const articles = require('../api/article/article');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');

//const upload = multer({dest: 'uploads/'});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        //if (process.env.NODE_ENV === 'production')
        //path.resolve(__dirname, '../../react-ui/src/assets/images')
        // cb(null, './uploads');
        cb(null, path.resolve(__dirname, '../../react-ui/src/assets/images'));
    },
    filename: (req, file, cb) => {
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    }
})

const upload = multer({ storage });

module.exports = (app, db) => {
    app.get('/api/articles', articles.showAll(db));
    app.get("/api/articles/:id", articles.show(db));
    //app.post("/api/articles", upload.single('splash'), articles.new(db));
    app.post("/api/articles", upload.fields([{ name: 'splash', maxCount: 1 }, { name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), articles.new(db));
    app.put("/api/articles", upload.fields([
        { name: 'splash', maxCount: 1 },
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 }]), articles.edit(db));

    // app.post("/api/upload", upload.single('selectedFile'), (req, res) => {
    //     console.log('req.body', req.file.path);
    //     console.log('req.body', req.file.filename);
    //     /*
    //       We now have a new req.file object here. At this point the file has been saved
    //       and the req.file.filename value will be the name returned by the
    //       filename() function defined in the diskStorage configuration. Other form fields
    //       are available here in req.body.
    //     */
    //     res.status(200).send(req.file.filename);}
    //     )
    // app.post("/api/upload",  async (req, res) => {
    //     console.log('upload')
    //     console.log('req.fd=>', req.body);
    //    // const articles = await Article.find({})   // empty object dumps the whole database
    //     //.select({recipients: false});
    //     res.status(200);}
    //     );
    // app.delete("/api/articles/:id", articles.new(db));
    // app.put("/api/articles", articles.edit(db));

    // app.use(function(err, req, res, next) {
    // 	logger.info(`error ${JSON.stringify(err)}`);
    // 	next();
    // });
};
