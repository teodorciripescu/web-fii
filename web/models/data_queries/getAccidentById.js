const {getRequest} = require('../requests');

module.exports = async function(id){
    let result;
    const options = {
        hostname: process.env.DATASET_SERVICE,
        port: process.env.DATASET_SERVICE_PORT,
        path: '/accident?id=' + id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    result = await getRequest(options);

    return result.data;
}
