const {login} = require('../../models');

exports.login = async (req, res) => {
    const obj = await login(req.body);
    console.log(obj);
    res.statusCode = obj.status;

    return res.end(JSON.stringify(obj));
};
