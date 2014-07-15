var http = require('http');
var fs = require('fs');
var index = fs.readFileSync("index.html");

http.createServer(function (req, res) {
    var userAgent = req.headers["user-agent"];
    if (userAgent) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(index);
    }
}).listen(9615);