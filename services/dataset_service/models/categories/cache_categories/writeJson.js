const fs = require('fs');

module.exports = async function (path, json) {
    return new Promise(resolve => {
        fs.writeFile(path, JSON.stringify(json), 'utf8', function(err){
            if(err)resolve(err);
            resolve('done');
        });
    });
}