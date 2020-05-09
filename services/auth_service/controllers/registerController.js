const {register, login} = require('../models');
const {createToken} = require('../utils/jwtUtils');
module.exports = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const registerResult = await register(username, password,email);
    if (registerResult) {
        const loginResult = await login(username, password);
        const tokenPayload = {
            id: loginResult,
            username: username
        }
        const token = await createToken(tokenPayload ,process.env.JWT_SECRET);
        const obj = {success: true, status:201, message: 'Registration successful!', token, user:tokenPayload};
        res.statusCode = 201; //created
        return res.end(JSON.stringify(obj));
    } else {
        const obj = {success: false, status:403, message: 'There was an issue with your registration.'};
        res.statusCode = 403; //Forbidden
        return res.end(JSON.stringify(obj));
    }
};