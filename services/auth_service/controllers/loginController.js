const {login} = require('../models');
const {createToken} = require('../utils/jwtUtils');
module.exports = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const loginResult = await login(username, password);
    if (loginResult) {
        const tokenPayload = {
            id: loginResult,
            username: username
        }
        const token = await createToken(tokenPayload ,process.env.JWT_SECRET);
        const obj = {success: true, status:200, message: 'You logged in successfully!', token, user: tokenPayload};
        res.statusCode = 200;
        return res.end(JSON.stringify(obj));
    } else {
        const obj = {success: false, status:401, message: 'Login failed.'};
        res.statusCode = 401; //Unauthorized
        return res.end(JSON.stringify(obj));
    }

};