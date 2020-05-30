//module.exports = async (req, res) => {};
const {internalDelete} = require('../../models');
const {internal} = require('../../models');
const {createToken} = require('../../utils/jwtUtils');
module.exports = async (req, res) => {
    let ok=0;

    //console.log("something");

    const username = req.body.username;
    const password = req.body.password;
    //console.log("us1:"+username);
    //console.log("pss1:"+password);
let internalResult;
console.log("parola:"+password+"!");
    if(password!==" ")
    {
        console.log("nu intru unde trebuie");
        internalResult = await internal(username, password);
    ok=1;
    }
    else
    {  internalResult = await internalDelete(username);
    ok=2;}


    if ( internalResult) {
        //res.end("test");
        //console.log("sunt in loginresult ==1:");
        const tokenPayload = {
            // id: loginResult,
            username: username
        };
        const token = await createToken(tokenPayload ,process.env.JWT_SECRET);

        let obj;
        if(ok==1)
        obj = {success: true, status:200, message: 'Your admin creation is successfully!', token, user: tokenPayload};
        else if(ok==2)
        obj = {success: true, status:200, message: 'Your admin deleting is successfully!', token, user: tokenPayload};

        console.log(JSON.stringify(obj));
        res.statusCode = 200;
        console.log(obj);
        res.end(JSON.stringify(obj));



    } else {
        let obj;
        if(ok==1)
            obj = {success: false, status:401, message: 'Your admin creation failed. - The username you have inserted already exists in database.'};
            else if(ok==2)
                obj = {success: false, status:401, message: 'Your admin deleting failed.- The account you tried to delete is not an existing account.'};
        res.statusCode = 401; //Unauthorized

        res.additionalHeaders = {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type"
        };
        return res.end(JSON.stringify(obj));
    }

};


