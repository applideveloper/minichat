
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
// var user = require('./routes/user');
var http = require('http');
var path = require('path');
var chatsockets = require('./sockets/chat.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
app.use(express.bodyParser());

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
// if ('development' == app.get('env')) {
app.configure('development', function() {
  app.use(express.errorHandler());
});
// }

app.get('/', routes.index);
// app.get('/users', user.list);
app.post('/room', routes.room);

var server = http.createServer(app);
var io = require('socket.io').listen(server, {log:false});

// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

// socket.ioのコネクション設定
io.sockets.on('connection', chatsockets.onConnection);
