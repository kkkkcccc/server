const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const businessesRoutes = require('./api/routes/businesses');
const authRoutes = require('./api/routes/auth');

app.use(morgan('dev'));
app.use( bodyParser.urlencoded( {extended:false} ) );
app.use( bodyParser.json() );

//Adding CORS to use with other servers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE")
        return res.status(200).json({});
    }
    next();
});

app.use('/businesses', businessesRoutes);
app.use('/auth', authRoutes);

// index page here
app.get('/', function(req, res){
    res.status(200).json({
        message : 'index page /',
    });
});

app.use((req, res, next) => {
    const error = new Error('Page...Not Found!!');
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : { 
            message: error.message
        }
    });
});

module.exports = app;