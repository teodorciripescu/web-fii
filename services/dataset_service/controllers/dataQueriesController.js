const {dataQueries} = require('../models');

module.exports = async (req, res) => {
    let obj = {};
    try{
        obj = await dataQueries.getChartData(req.body);
    } catch(e){
        console.log(e);
    }
    res.statusCode = obj.status;
    return res.end(JSON.stringify(obj));
};