const {adminLogin} = require('../../models');

exports.login = async (req, res) => {
    const obj = await adminLogin(req.body);
    console.log(obj);
    res.statusCode = obj.status;

    return res.end(JSON.stringify(obj));
};
