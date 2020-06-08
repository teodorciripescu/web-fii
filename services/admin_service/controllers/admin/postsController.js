const {posts} = require('../../models');
const {createToken} = require('../../utils/jwtUtils');

module.exports = async (req, res) => {

    //console.log("something");

    const username = req.body.username;
    const msg = req.body.message;
    //console.log("us1:"+username);

    var d = new Date();
    const date=d.getTime();

    const loginResult = await posts(username, msg,date);

    if (loginResult) {
        const tokenPayload = {

            username: username
        };
        const token = await createToken(tokenPayload ,process.env.JWT_SECRET);


   /*     res.writeHead(200, {
            'Set-Cookie':'token='+token+'; expires='+new Date(new Date().getTime()+86409000).toUTCString(),
            'Content-Type': 'text/plain'
        });
*/
        const obj = {success: true, status:200, message: 'Your post was successfully displayed!', token, user: tokenPayload};
        console.log(JSON.stringify(obj));
        res.statusCode = 200;
        console.log(obj);
        res.end(JSON.stringify(obj));



    } else {
        const obj = {success: false, status:401, message: 'Posting process failed.'};
        res.statusCode = 401; //Unauthorized

    /*    res.additionalHeaders = {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type"
        };*/
        return res.end(JSON.stringify(obj));
    }

};


