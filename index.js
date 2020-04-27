var http = require('http');

const PORT = 3000;

var router = require('./routes');


var server = http.createServer(function(req, res) {
    router(req, res, function () {
        //TODO pun in utils functia asta
        //callback, este apelat cand un request nu a fost tratat nicaieri altundeva
        //in caz ca un request nu a mers bine va fi rezolvat aici
        //request la o ruta inexistenta
        const obj = {
            success: false,
            message: `Request could not be made at this route. Cannot ${req.method} at ${req.url} `
        };
        res.setHeader('Content-Type', 'application/json; charset=utf-8'); //altfel ar trebui sa fie html
        res.statusCode = 403; //Forbidden
        res.end(JSON.stringify(obj));
    });
});

server.listen(PORT, function (err) {
    console.log('Listening on port ' + PORT);
});