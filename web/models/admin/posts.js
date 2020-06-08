const {postRequest} = require('../requests');

module.exports = async function(internalData){
    let result;
    const options = {
        hostname: process.env.ADMIN_SERVICE,
        port: process.env.ADMIN_SERVICE_PORT,
        path: '/posts',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if(internalData.message&&internalData.username){
        result = await postRequest(internalData, options);
    } else{
        result = {
            success:false,
            message:'Body parameters are invalid.',
            status: 400 //bad request
        }
    }

    return result;
};

