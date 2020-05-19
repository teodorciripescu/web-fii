const {getRequest} = require('../requests');

module.exports = async function(){
    let result, options;

    options = {
        hostname: process.env.DATASET_SERVICE,
        port: process.env.DATASET_SERVICE_PORT,
        path: `/`,
        method: 'GET'
    }
    result = await getRequest(options);

    return result;
}

