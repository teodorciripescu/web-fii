const url = require('url');
const {dataQueries} = require('../models');

module.exports = async function(req,res){
    const url_parts = url.parse(req.url, true);
    const params = url_parts.query;
    const id = params.id;
    const data = await dataQueries.getAccidentById(id);
    res.statusCode = 200;
    res.end(JSON.stringify(data));
}