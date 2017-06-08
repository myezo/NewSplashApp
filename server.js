var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var connection = require('./config/connection.js');

var app = express();

//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 6*1000*1000*1000*1000*1000*1000 }}));
app.use(cookieParser());

app.use(express.static(__dirname + '../public'));

//app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var applicationController = require("./controllers/applicationController.js");
var usersController = require("./controllers/usersController.js");

app.use("/", applicationController);
app.use("/users", usersController);

var port = process.env.PORT || 8080;
app.listen(port);