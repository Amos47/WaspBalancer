// Software is a node static found online at https://github.com/cloudhead/node-static
// Slightly modified.

var static = require('node-static');

var fileServer = new static.Server('../pages', { cache: 3600 });


var port = process.argv[2] || 8080;



    require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            fileServer.serve(request, response, function (err, result) {
                if (err) { // There was an error serving the file
                    console.log("Error serving " + request.url + " - " + err.message);

                    // Respond to the client
                    response.writeHead(err.status, err.headers);
                    response.end();
                }
            });
        }).resume();
    }).listen(port);

    console.log("Started server on port : " + port);

