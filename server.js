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

function main(argv, config, callback) {
    var options = main(argv)
        .usage("Usage: $0 [CONFIG_NAME] [--help]")
        .alias("s", "settings")
        .default("settings")
        .describe("settings", "Settings file to use")
        .boolean("help")
        .describe("help", "Show command line options.");

    var configs = options.argv._;
    if (!configs.length) 
        configs = [config];
        
    configs.forEach(function(config) {
        return main(shortcuts[config].concat(argv.filter(function(arg) {
            return arg != config;
        })), null, callback);
    });
}

var shortcuts = {
    "dev"  : ["ide", "preview", "vfs", "api", "proxy", "redis", "legacy", "homepage", "apps-proxy", "-s", "devel"],
    "odev"  : ["ide", "preview", "vfs", "api", "proxy", "legacy", "homepage", "apps-proxy", "worker", "-s", "onlinedev"],
    "beta" : ["ide", "preview", "vfs", "proxy", "-s", "beta"],
    "ci"   : ["ide", "preview", "vfs", "proxy", "-s", "ci"],
    "s"    : ["standalone", "-s", "standalone"]
};