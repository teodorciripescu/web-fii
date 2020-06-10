const {internalDelete} = require('../../models');
const {internal} = require('../../models');

module.exports = async (req, res) => {
    let ok=0;

    const username = req.body.username;
    const password = req.body.password;

    let internalResult;

    if(password!==" ")
    {
        internalResult = await internal(username, password);
        ok=1;
    }
    else
    {
        internalResult = await internalDelete(username);
        ok=2;
    }


    if ( internalResult) {

        let obj;
        if(ok==1)
        obj = {success: true, status:200, message: 'Your admin creation is successfully!'};
        else if(ok==2)
        obj = {success: true, status:200, message: 'Your admin deleting is successfully!',};
        res.statusCode = 200;
        res.end(JSON.stringify(obj));


    } else {
        let obj;
        if(ok==1)
            obj = {success: false, status:401, message: 'Your admin creation failed. - The username you have inserted already exists in database.'};
            else if(ok==2)
                obj = {success: false, status:401, message: 'Your admin deleting failed.- The account you tried to delete is not an existing account.'};
        res.statusCode = 401; //Unauthorized

        return res.end(JSON.stringify(obj));
    }

};


