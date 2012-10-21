var express = require('express')
  , routes  = require('../routes')
  , http    = require('http')
  , path    = require('path')
  , loggly  = require('loggly');

exports.init = function() {
  var config = { subdomain: "bjoli" };
  var client = loggly.createClient(config);
  var app = express();

  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'ejs');
    app.use(express.favicon(__dirname + '/../public/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/../public' }));
    app.use(express.static(path.join(__dirname, '/../public')));
    app.use(function(req, res, next) {
      client.log(process.env.LOGGLY_INPUT_TOKEN, req.method + ' ' + req.url + ' ' + req.ip);
      next();
    });
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  app.get('/', routes.index);

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
    client.log(process.env.LOGGLY_INPUT_TOKEN, 'Starting up bjoli-com.')
  });

}
