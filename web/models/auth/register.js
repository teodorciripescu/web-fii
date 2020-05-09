const {postRequest} = require('../requests');

module.exports = async function(registerData){
    let result;
    const options = {
        hostname: process.env.AUTH_SERVICE,
        port: process.env.AUTH_SERVICE_PORT,
        path: '/auth/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(registerData.username && registerData.password && registerData.email){
        result = await postRequest(registerData, options);
    } else{
        result = {
            success:false,
            message:'Body parameters are invalid.',
            status: 400 //bad request
        }
    }

    return result;
}

