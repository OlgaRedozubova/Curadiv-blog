const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./models/articleModel');
require('./models/commentModel');
require('./models/userModel');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://igor_dev:abcdef123@ds161062.mlab.com:61062/igor_dev');

const app = express();
app.use(bodyParser.json());

require('./routes/articleRoutes')(app);


app.use("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });


app.get('/', (req, res) => {
    res.send({ hi: 'there'});
});


const PORT = process.env.PORT || 5000;
app.listen(PORT);