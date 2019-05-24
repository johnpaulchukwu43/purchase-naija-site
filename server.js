var express = require('express');
var httpProxy = require('http-proxy');
var secret = require('./secret');
var app = express();
var path = require('path');
var directory = '/' + (process.env.STATIC_DIR || 'build');
app.use(express.static(__dirname + directory));

var apiForwardingUrl = secret.proxyToApi || 'http://localhost:5000';

console.log(secret.port);
var proxyOptions = {
    changeOrigin: true
};

httpProxy.prototype.onError = function (err) {
    console.log(err);
};
var apiProxy = httpProxy.createProxyServer(proxyOptions);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.all("/api/v1/*", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log('Listening on', port);
    console.log('Forwarding API requests to', apiForwardingUrl);
});
