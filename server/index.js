var express = require('express');
var app = express();
var logger = require('morgan');
// const sendMail = require('./mail');
const bodyParser = require('body-parser');
const http = require('http');

const port = parseInt(process.env.PORT, 10) || 1000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

require('dotenv').config()

// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));

//Model
var model = require("./models");
//Sync Database
model.sequelize.sync().then(function () {
    console.log("Database Terkoneksi");
}).catch(function (err) {
    console.log(err, "Database tidak terkoneksi");
});

//Passport
const passport = require('passport');
app.use(passport.initialize());

// CORS
const cors = require('cors');
app.use(cors());

// CORS middleware
app.use(function (req, res, next) {
    // Allow Origins
    res.header("Access-Control-Allow-Origin", "*");
    // Allow Methods
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    // Allow Headers
    res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization");
    // Handle preflight, it must return 200
    if (req.method === "OPTIONS") {
        // Stop the middleware chain
        return res.status(200).end();
    }
    // Next middleware 
    next();
});

// Routes
const AuthRoute = require('./routes/AuthRoute');
const AkunRoute = require('./routes/AkunRoute');

app.get('/', function (req, res) {
    res.json({ message: 'Api Tersedia' });
});
app.use('/autentikasi', AuthRoute);
app.use('/akun', AkunRoute);

// catch 404 and forward to error handler
// app.use(function (req, res, next, err) {
//     res.json({ 
//         status: '404',
//         message: 'Api tidak ditemukan' });
//     // err.status = 404;
//     next(err);
// });

//This is here to handle all the uncaught promise rejections
const pe = require('parse-error');
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});

module.exports = app;