const http = require('http');

module.exports = function(options){
    return new Promise((resolve, reject) => {
        try{
            let data = '';
            const req = http.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`);
                res.on('data', chunk => {
                    data += chunk;
                });
                res.on('end', () => {
                    let result = {data: JSON.parse(data)};
                    result.statusCode = res.statusCode;
                    resolve(result);
                });
            })
            req.on('error', error => {
                reject(error);
            });
            req.end();
        }
        catch (e) {
            reject(e);
        }
    });
}

