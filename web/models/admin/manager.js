const {getRequest} = require('../requests');

module.exports = async function(){
    let result;
    const options = {
        hostname: process.env.ADMIN_SERVICE,
        port: process.env.ADMIN_SERVICE_PORT,
        path: '/manager',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
 //   if(loginData.username && loginData.password){
        result = await getRequest(options);
/*
    } else{
        result = {
            success:false,
            message:'Body parameters are invalid.',
            status: 400 //bad request
        }
    }
*/

    return result;
}

