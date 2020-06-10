const {start} = require('../../models');

module.exports = async (req, res) => {
    const obj = await start();
    //console.log(obj);
    res.statusCode = obj.statusCode;

    return res.end(JSON.stringify(obj));
};