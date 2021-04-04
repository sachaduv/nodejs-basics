var http = require('http');
var module1 = require('./module1');
var module2 = require('./module2');
var app = require('./app');

http.createServer(app.handleRequests).listen(3000)