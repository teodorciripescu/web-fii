const {postRequest} = require('../requests');

module.exports = async function(optionsData){
    let result;
    const options = {
        hostname: process.env.DATASET_SERVICE,
        port: process.env.DATASET_SERVICE_PORT,
        path: '/data_queries',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(optionsData.length>=0){
        result = await postRequest(optionsData, options);
    } else{
        result = {
            success:false,
            message:'Body parameters are invalid.',
            status: 400 //bad request
        }
    }

    return result;
}
