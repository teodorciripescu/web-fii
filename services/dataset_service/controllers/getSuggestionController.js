const url = require('url');
const {getSuggestion} = require('../models/categories');
module.exports = async function(req,res){
    const url_parts = url.parse(req.url, true);
    const params = url_parts.query;
    const column = params.category;
    const input = params.input;
    console.log(column,input);
    const data = await getSuggestion(column, input);
    res.statusCode = 200;
    res.end(JSON.stringify(data));
}