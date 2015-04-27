/**
 * Module dependencies.
 */
var fs = require('fs');
var config = require('./dbconfig.js');
var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose');
//mongoose.connect(config.db.mongodb);
var models = require('./models')({ mongoose: mongoose });
var controllers = require('./controllers')();//({mongoose: mongoose});
var http = require('http');
var path = require('path');
var hbs = require('hbs');
var app = express();
//var products = mongoose.model('products');

// Configuration
app.configure(function(){	
	app.set('port', process.env.PORT || 3000);
	app.use(express.static(path.join(__dirname, 'public')));
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'html');
	app.engine('html', hbs.__express);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(app.router);	
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// setup routes
routes.setup({
    'controllers': controllers,
    'app': app
});

var server = http.createServer(app);
  
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});