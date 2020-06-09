const {login} = require('../../models');
const {createToken} = require('../../utils/jwtUtils');

module.exports = async (req, res) => {

    //console.log("something");

    const username = req.body.username;
    const password = req.body.password;


    const loginResult = await login(username, password);

    if (loginResult) {
        const tokenPayload = {

            username: username
        };
        const token = await createToken(tokenPayload ,process.env.JWT_SECRET_ADMIN);



            // To Write a Cookie
            res.writeHead(200, {
                'Set-Cookie':'token='+token+'; expires='+new Date(new Date().getTime()+86409000).toUTCString(),
                'Content-Type': 'text/plain'
            });

        const obj = {success: true, status:200, message: 'You logged in successfully!', token, user: tokenPayload};
        res.statusCode = 200;
        res.end(JSON.stringify(obj));



    } else {
        const obj = {success: false, status:401, message: 'Login failed.'};
        res.statusCode = 401; //Unauthorized

        return res.end(JSON.stringify(obj));
    }

};


