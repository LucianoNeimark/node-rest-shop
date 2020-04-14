const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products.js');
const orderRoutes = require('./api/routes/oders.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lneimark:Og18505b@node-rest-shop-hb2l4.mongodb.net/test?retryWrites=true&w=majority', {
     useNewUrlParser: true, useUnifiedTopology: true 
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) =>{

    res.header('Acces-Control-Allow-Origin', '*'); //Allow every client to acces to your API (CORS ERR)
    res.header('Acces-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //Which methods are allowed (CORS ERR)
        return res.status(200).json({});
    }

    next();
});

//routes which handle requests
app.use('/products', productRoutes); // Todo lo que sea via '/products' se maneja con productRoutes
app.use('/orders', orderRoutes); //// Todo lo que sea via '/orders' se maneja con orderRoutes

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});
module.exports = app;