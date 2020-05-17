const {filter} = require('../models');
module.exports = async function(req,res){
    const columns = req.body.filters;
    const page = req.body.page;
    const maxEntries = req.body.maxEntries;
    const data = await filter(columns, page, maxEntries);
    res.statusCode = 200;
    res.end(JSON.stringify(data));
}