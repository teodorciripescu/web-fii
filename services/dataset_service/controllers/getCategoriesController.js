const url = require('url');
const {getCategories} = require('../models');
module.exports = async function (req, res) {
    const url_parts = url.parse(req.url, true);
    const params = url_parts.query;
    const chosenCategories = params.chosenCategories;

    const response = await getCategories(chosenCategories);
    res.statusCode = 200;
    res.end(JSON.stringify(response));
}