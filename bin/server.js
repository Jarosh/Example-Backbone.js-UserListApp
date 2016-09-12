var fs = require("fs");
var path = require("path");
var http = require("http");

var port = ( (process.argv.length>2) ? parseInt(process.argv[2]) : null ) || 3000;


http.createServer(function(req, res) {

    console.log(`${req.method} request for ${req.url}`);

    try {
        if (req.url.match(/.(js|css)$/)) {
            var src = path.join(__dirname, '../app', req.url);
            if (!fs.existsSync(src))
                throw Error(404);
            res.writeHead(200, { 'Content-Type': req.url.match(/.js$/) ? 'application/javascript' : 'text/css' });
            fs.createReadStream(src, 'UTF-8').pipe(res);
        } else {
            var src = '../app/index.html';
            if (!fs.existsSync(src))
                throw Error(404);
            fs.readFile(src, 'UTF-8', function(err, html) {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(html);
            });
        }
    } catch(e) {
        var code = 500;
        var text = '500 Internal server error';
        switch (parseInt(e.message)) {
            case 404:
                code = 404;
                text = code + ' File Not Found';
                break;
        }
        res.writeHead(code, {'Content-Type': 'text/plain'});
        res.end(text);
    }

}).listen(port);


console.log( 'Server is running on port ' + port );
