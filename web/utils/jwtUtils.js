const jwt = require('jsonwebtoken');

exports.createToken = function(payload, secret){
    //vom semna payload-ul primit cu un secret pentru a obtine tokenul
    return new Promise(function(resolve, reject){
        jwt.sign({payload}, secret , {expiresIn: '30d'}, function(err, token){
            //in caz de eroare, o intoarcem prin reject
            if(err)reject(err);
            //intoarcem tokenul
            resolve(token);
        });
    });
}
exports.extractToken = function(req, tokenName){
    //verificam daca este prezent header-ul de autorizare
    const token = getCookies(req)[tokenName];
    if (token &&
        //verificam daca header-ul contine Bearer,
        //spargand stringul in 2 bucati la intalnirea caracterului ' '
        token.split(' ')[0] === 'Bearer') {
        //intoarcem tokenul extras
        return token.split(' ')[1];
    }
    return null;
}

exports.decodeToken = function(token, secret){
    try {
        //verificam daca tokenul este unul valid
        //in caz afirmativ va fi returnata valoarea decriptata a tokenului
        return jwt.verify(token, secret);
    } catch (error) {
        throw error;
    }
}

function getCookies(request) {
    var cookies = {};
    try{
    request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
        let chunks = cookie.match(/(.*?)=(.*)$/)
        cookies[ chunks[1].trim() ] = (chunks[2] || '').trim();
    });
    } catch(error){}
    return cookies;
}