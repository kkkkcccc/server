const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const businessesRoutes = require('./api/routes/businesses');
const authRoutes = require('./api/routes/auth');

app.use(morgan('dev'));
app.use( bodyParser.urlencoded( {extended:false} ) );
app.use( bodyParser.json() );

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