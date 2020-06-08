const {postRequest} = require('./requests');

module.exports = async function(internalData){
    let result;
    const options = {
        hostname: process.env.MAP_SERVICE,
        port: process.env.MAP_SERVICE_PORT,
        path: '/map',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if(internalData.latmax!=null&&internalData.latmin!=null&&internalData.lngmax!=null&&internalData.lngmin!=null){
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

