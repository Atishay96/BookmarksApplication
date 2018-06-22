require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
switch (process.env.mode) {
    case 'development':
        process.env.database = process.env.DevDatabase;
        process.env.port = process.env.Devport;
        process.env.baseURL = process.env.DevBaseURL;
        break;
    case 'test':
        process.env.database = process.env.TestDatabase;
        process.env.port = process.env.Testport;
        process.env.baseURL = process.env.TestBaseURL;
        break;
    default:
        process.env.mode = 'production';
        process.env.database = process.env.ProdDatabase || 'mongodb://localhost/bookmarks';
        process.env.port = process.env.Prodport || 2005;
        process.env.baseURL = process.env.ProdBaseURL || '';
}

//routes
const UserRoutes = require('./routes/UserRoutes');
const WebRoutes = require('./routes/WebRoutes');

mongoose.connect(process.env.database).catch((err) => {
    if (err) {
        console.error(err);
    }
})

if (process.env.mode != 'production') {
    console.log("MODE => " + process.env.mode);
    console.log("PORT => " + process.env.port);
    console.log("Database => " + process.env.database);
}

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// To stop mongodb injection 
app.use(mongoSanitize());

//routes files
app.use('/api/user/', UserRoutes);
app.use('/', WebRoutes);
// catch 404
app.use((req, res, next) => {
    return res.status(404).send({ message: "Wrong URL" });
});

const server = app.listen(process.env.port, () => {
  console.log('Server is up and running');
});