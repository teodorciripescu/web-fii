const {adminLogin} = require('../../models');
const {adminInternal} = require('../../models');

exports.login = async (req, res) => {
    const obj = await adminLogin(req.body);
    console.log(obj);
    res.statusCode = obj.status;

    return res.end(JSON.stringify(obj));
};


exports.internal = async (req, res) => {
    const obj = await adminInternal(req.body);
    console.log(obj);
    res.statusCode = obj.status;

    return res.end(JSON.stringify(obj));
};