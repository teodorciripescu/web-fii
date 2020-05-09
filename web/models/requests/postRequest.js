const http = require('http');

module.exports = function(requestBody, options){
    return new Promise((resolve, reject) => {
        try{
            const data = JSON.stringify(requestBody);
            options.headers['Content-Length'] = data.length;
            var response = '';

            const req = http.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`);
                //console.log(res);
                res.on('data', chunk => {
                    response += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(response));
                });
            });
            req.on('error', error => {
                reject(error);
            })
            req.write(data);
            req.end();
        }
        catch (e) {
            reject(e);
        }
    });
}

