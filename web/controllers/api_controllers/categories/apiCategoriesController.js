const url = require('url');
const {getCategories} = require('../../../models');

module.exports = async (req, res) => {

    const obj = await getCategories();
    console.log(obj);
    res.statusCode = obj.statusCode;
    return res.end(JSON.stringify(obj.data));
};