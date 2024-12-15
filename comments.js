//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var comments = [];
var server = http.createServer(function(request, response) {
    var parseUrl = url.parse(request.url);
    var pathname = parseUrl.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                response.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                response.end('<h1>404 Not Found</h1>');
            } else {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.end(data);
            }
        });
    } else if (pathname === '/getComments') {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end(JSON.stringify(comments));
    } else if (pathname === '/addComment') {
        var data = '';
        request.on('data', function(chunk) {
            data += chunk;
        });
        request.on('end', function() {
            var comment = querystring.parse(data);
            comments.unshift(comment);
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            response.end(JSON.stringify(comment));
        });
    } else {
        response.writeHead(404, {
            'Content-Type': 'text/html'
        });
        response.end('<h1>404 Not Found</h1>');
    }
});
server.listen(3000, function() {
    console.log('Server is running...');
});
