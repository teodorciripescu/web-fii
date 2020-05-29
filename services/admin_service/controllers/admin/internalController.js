//module.exports = async (req, res) => {};
const {internal} = require('../../models');
const {createToken} = require('../../utils/jwtUtils');
module.exports = async (req, res) => {

    //console.log("something");

    const username = req.body.username;
    const password = req.body.password;
    //console.log("us1:"+username);
    //console.log("pss1:"+password);

    const internalResult = await internal(username, password);

    if ( internalResult) {
        //res.end("test");
        //console.log("sunt in loginresult ==1:");
        const tokenPayload = {
            // id: loginResult,
            username: username
        };
        const token = await createToken(tokenPayload ,process.env.JWT_SECRET);
        const obj = {success: true, status:200, message: 'You logged in successfully!', token, user: tokenPayload};
        console.log(JSON.stringify(obj));
        res.statusCode = 200;
        console.log(obj);
        res.end(JSON.stringify(obj));



    } else {
        const obj = {success: false, status:401, message: 'Login failed.'};
        res.statusCode = 401; //Unauthorized

        res.additionalHeaders = {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type"
        };
        return res.end(JSON.stringify(obj));
    }

};


