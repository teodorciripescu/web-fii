module.exports = function(){
    return function (req,res,next) {
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                try {
                    body = JSON.parse(body.toString());
                    req.body = body;
                    next();
                }catch (e) {
                    req.body = {};
                    next();
                }
            });
    }
};