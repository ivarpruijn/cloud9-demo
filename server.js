var http = require("http");
var fs = require("fs");
var index = fs.readFileSync("index.html");
var port = 9615;

http.createServer(function (req, res) {
    var userAgent = req.headers["user-agent"];
    if (userAgent) {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(index);
    }
    for (var i = 0; i < userAgent.length; i++) {
        var userAgentChar = userAgent.charAt(i);
        writeToLog("User-Agent at position " + i + " is '" 
            + userAgentChar + "'\n");
    }
    
    function writeToLog(message) {
        fs.appendFile("output.log", message, function (err) {
            if (err)
                console.error("Error writing to log file");
        });
    }
}).listen(port);

console.log("Server running on port " + port);

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