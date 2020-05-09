const {postRequest} = require('../requests');

module.exports = async function(loginData){
    let result;
    const options = {
        hostname: process.env.AUTH_SERVICE,
        port: process.env.AUTH_SERVICE_PORT,
        path: '/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(loginData.username && loginData.password){
        result = await postRequest(loginData, options);
    } else{
        result = {
            success:false,
            message:'Body parameters are invalid.',
            status: 400 //bad request
        }
    }

    return result;
}

