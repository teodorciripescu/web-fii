const url = require('url');
const {suggestion} = require('../../../models');

module.exports = async (req, res) => {
    console.log('hi');
    const url_parts = url.parse(req.url, true);
    const params = url_parts.query;
    const obj = await suggestion(params);
    console.log(obj);
    res.statusCode = obj.statusCode;

    return res.end(JSON.stringify(obj.data));
};