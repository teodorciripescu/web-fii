const http = require('http');
const dotenv = require('dotenv');

//in case NODE_ENV is not defined, set it to development
process.env.NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
//setting the config files
dotenv.config({
    path: `${__dirname}/configs/${process.env.NODE_ENV}.env`,
});
const PORT = process.env.PORT;

const router = require('./routes');
const {routerFinalHandler} = require('./utils');

const server = http.createServer(function(req, res) {
    router(req, res, function(){
        return routerFinalHandler(req,res);
    });
});

server.listen(PORT, function (err) {
    console.log('Listening on port ' + PORT);
});

//require('./utils/uploadDatasetPostgresql');