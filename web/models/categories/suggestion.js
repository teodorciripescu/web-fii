const {getRequest} = require('../requests');

module.exports = async function(params){
    let result, options;
    if(params.category && params.input){
        options = {
            hostname: process.env.DATASET_SERVICE,
            port: process.env.DATASET_SERVICE_PORT,
            path: `/categories/suggestion?category=${params.category}&input=${params.input}`,
            method: 'GET'
        }
        result = await getRequest(options);
    } else{
        result = {
            data:{
                success:false,
                message:'Params are invalid.'
            },
            statusCode: 400 //bad request
        }
    }
    return result;
}

