'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

// App
// const app = express();
// app.get('/', (req, res) => {
//     console.log("Request Recieved");
// res.send('Hello. This is Jaspreet. I am running a docker container.\n');
// });
//
// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);



// var routes = require('./routes');
var http = require('http');
// var proxyServer = require('http-proxy');
// var port = parseInt(process.argv[2]);
var path = require('path');
var ejs = require("ejs");
var logger = require('morgan');
var bodyParser=require('body-parser');
const favicon = require('express-favicon');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var errorhandler = require('errorhandler');

// all environments
// app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('X-HTTP-Method-Override'));

var Router = require('named-routes');
var router = new Router();

app.use(app.router);
app.get('/', function (req, res) {
    res.send('Hello World!')
})






app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());

app.use(cookieParser());
app.use(session({
    secret : '1234567890QWERTY'
}));

// development only
if ('development' === app.get('env')) {
    app.use(errorhandler());
}
//Freedor Website

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Please check the URL again. Page does not exists!!');
    err.status = 404;
    next(err);
});

app.get('/', routes.index);
app.get('/viewCustomers', routes.viewCustomers);
app.get('/users/:userId', routes.getUserById);
app.get('/category', routes.viewCategories);
app.get('/category/:categoryId', routes.getCategoryById);

app.get('/category/:categoryId/product/:productId', routes.getProductById);
app.get('/category/:categoryId/product', routes.getProductsBycatId);

app.get('/category/:categoryId/offer', routes.viewOffers);

app.get('/category/:categoryId/product/:productId/offer', routes.byproductid);

app.get('/category/:categoryId/product/:productId/offer/:offerId', routes.byofferid);

//Additional Api's

//app.put('/validateUser', routes.validateUser);
app.del('/removeuser/:emailId', routes.removeUser);
app.put('/updateuser', routes.updateuser);
//user
app.post('/users', routes.createuser);

app.get('/',routes.index);
//Category
app.post('/category', routes.createCategory);

//Product Related
app.post('/category/:categoryId/product', routes.createProduct);
app.put('/category/:categoryId/product/:productId', routes.updateProduct);
app.del('/category/:categoryId/product/:productId', routes.removeProduct);
app.get('/users/:userId', routes.getUserById);


//offer
app.post('/category/:categoryId/product/:productId/offer', routes.createoffer);
app.put('/category/:categoryId/product/:productId/offer/:offerId', routes.updateoffer);
app.del('/category/:categoryId/product/:productId/offer/:offerId', routes.removeOffer);

//comment
app.post('/category/:categoryId/product/:productId/offer/:offerId/comment', routes.postComment);

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);


http.createServer(app).listen(PORT, function(){
    console.log('Express server listening on port ' + PORT);
});