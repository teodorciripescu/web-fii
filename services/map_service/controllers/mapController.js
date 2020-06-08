const {map} = require('../models');


module.exports = async (req, res) => {

    var latmax=req.body.latmax;
    var latmin=req.body.latmin;
    var lngmax=req.body.lngmax;
    var lngmin=req.body.lngmin;

    const loginResult = await map(latmax,latmin,lngmax,lngmin);

    if (loginResult) {

        const obj = {success: true, status:200, rezultat:loginResult};
        console.log(JSON.stringify(obj));
        res.statusCode = 200;
        console.log(obj);
        res.end(JSON.stringify(obj));



    } else {
        const obj = {success: false, status:401, message: 'DataBase extraction failed.'};
        res.statusCode = 401; //Unauthorized

        return res.end(JSON.stringify(obj));
    }

};


