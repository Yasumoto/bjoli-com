var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.send('bjoli');
});

app.listen(3000);

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500)
  res.render('Things are not so jolly here. Please yell <a href="http://twitter.com/Yasumoto">@Yasumoto</a>');
}

console.log('Listening on port 3000');

