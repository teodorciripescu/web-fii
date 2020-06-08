const {getRequest} = require('./requests');

module.exports = async function(){
    let result;
    const options = {
        hostname: process.env.START_SERVICE,
        port: process.env.START_SERVICE_PORT,
        path: '/start',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

        result = await getRequest(options);


    return result;
};

