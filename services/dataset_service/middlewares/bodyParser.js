module.exports = function(){
    return function (req,res,next) {
        if (req.method === 'POST'){
            let body = [];
            try {
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {

                    body = JSON.parse(body.toString());
                    req.body = body;
                    next();

            });
            }catch (e) {
                req.body = {};
                next();
            }
        } else{
            next();
        }
    }
};