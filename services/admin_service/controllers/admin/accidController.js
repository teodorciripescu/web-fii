const {accid} = require('../../models');


module.exports = async (req, res) => {

    //console.log("something");

    const page = req.body.page;


    const loginResult = await accid(page);

    if (loginResult) {


        const obj = {success: true, status:200,  rezultat:loginResult};
        console.log(JSON.stringify(obj));
        res.statusCode = 200;
        console.log(obj);
        res.end(JSON.stringify(obj));



    } else {
        const obj = {success: false, status:401, message: 'EXtracting data from db failed.'};
        res.statusCode = 401; //Unauthorized

        return res.end(JSON.stringify(obj));
    }

};


