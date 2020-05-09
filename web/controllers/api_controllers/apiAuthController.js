const {login, register} = require('../../models');

exports.login = async (req, res) => {
    const obj = await login(req.body);
    console.log(obj);
    res.statusCode = obj.status;

    return res.end(JSON.stringify(obj));
};

exports.register = async (req, res) => {
    const obj = await register(req.body);
    console.log(obj);
    res.statusCode = obj.status;

    return res.end(JSON.stringify(obj));
};