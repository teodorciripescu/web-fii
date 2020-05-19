module.exports = function(){
    return function (req,res,next) {
        if (req.method === 'POST'){
            let body = [];
            try {
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                    try{
                        body = JSON.parse(body.toString());
                        req.body = body;
                        next();
                    } catch(e){
                        req.body = {error:e};
                        next();
                    }
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