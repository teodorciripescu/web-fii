const fs = require('fs');

module.exports = async function (path) {
    return new Promise(resolve => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) resolve(err);
            resolve(JSON.parse(data));
        });
    });
}