const bcrypt = require('bcrypt');

module.exports.hashPassword = function (password) {
    return new Promise((resolve, reject) => {
        //primul argument este parola
        //al doilea: numarul de 'runde' pentru a genera salt-ul
        bcrypt.hash(password, 10, function(err, hash) {
            if(err) reject(err);
            resolve(hash);
        });
    });
}

module.exports.comparePassword = function (password, hash) {
    return new Promise((resolve, reject) => {
        //primul argument este parola
        //al doilea este hash-ul
        bcrypt.compare(password, hash, function(err, res) {
            if(err) reject(err);
            if(res){
                resolve(res);
            }
            resolve(res);
        });
    });
}