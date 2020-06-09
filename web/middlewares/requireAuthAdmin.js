const {extractToken, decodeToken} = require('../utils/jwtUtils');

module.exports = function (req, res, next){
    try {
        const token = extractToken(req,'adminToken');
        if (token) {
            // verify if the token is authentic
            try{
                req.user = decodeToken(token, process.env.JWT_SECRET_ADMIN).payload;
                return next();
            } catch (error) {
                //console.log(error);
                res.statusCode = 401; //Unauthorised
                return res.end(JSON.stringify({
                    success: false,
                    message: 'You have an issue with your authorization token',
                }));
            }
        } else{

            //if auth is absolutely necessary
            let requireAuthpaths = ['/manager', '/internal','/posts','/accid'];
            console.log(req.url);
            if (!requireAuthpaths.includes(req.url)) {
                return next();
            }

            res.statusCode = 401;
            return res.end(JSON.stringify({
                success: false,
                message: 'You must have an authorization token',
            }));
        }
    } catch (error) {
        res.statusCode = 400;//Bad request
        return res.end(JSON.stringify({
            success: false,
        }));
    }
}