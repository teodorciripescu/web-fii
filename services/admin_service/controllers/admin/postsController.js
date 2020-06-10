const {posts} = require('../../models');
const {createToken} = require('../../utils/jwtUtils');

module.exports = async (req, res) => {

    const username = req.body.username;
    const msg = req.body.message;


    var d = new Date();
    const date=d.getTime();

    const loginResult = await posts(username, msg,date);

    if (loginResult) {

        const obj = {success: true, status:200, message: 'Your post was successfully displayed!'};
        res.statusCode = 200;
        res.end(JSON.stringify(obj));



    } else {
        const obj = {success: false, status:401, message: 'Posting process failed.'};
        res.statusCode = 401; //Unauthorized


        return res.end(JSON.stringify(obj));
    }

};


