const {map} = require('../../models');

module.exports = async (req, res) => {
    const obj = await map(req.body);
    console.log("obj:");
    console.log(obj);
    //res.statusCode = obj.statusCode;
    res.statusCode = 200;

    console.log("statusCode:"+res.statusCode);
    return res.end(JSON.stringify(obj));
};

