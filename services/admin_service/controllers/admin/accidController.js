const {accid} = require('../../models');


module.exports = async (req, res) => {

    const page = req.body.page;
    const loginResult = await accid(page);

    if (loginResult) {

        const obj = {success: true, status:200,  rezultat:loginResult};
        res.statusCode = 200;
        res.end(JSON.stringify(obj));

    } else {
        const obj = {success: false, status:401, message: 'Extracting data from db failed.'};
        res.statusCode = 401; //Unauthorized

        return res.end(JSON.stringify(obj));
    }

};


