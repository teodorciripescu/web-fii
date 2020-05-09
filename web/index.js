const http = require('http');
const dotenv = require('dotenv');
var path = require('path');
var serveStatic = require('serve-static');

//in caz ca NODE_ENV nu este definit, il alegem ca development
process.env.NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
//setting the config files
dotenv.config({
    path: `${__dirname}/configs/${process.env.NODE_ENV}.env`,
});
const PORT = process.env.PORT;

const router = require('./routes');
const {routerFinalHandler} = require('./utils');


//pentru servirea fisierelor 'publice'
router.use(serveStatic(path.join(__dirname, 'public')));

const server = http.createServer(function(req, res) {
    router(req, res, function(){
        return routerFinalHandler(req,res);
    });
});

server.listen(PORT, function (err) {
    console.log('Listening on port ' + PORT);
});
