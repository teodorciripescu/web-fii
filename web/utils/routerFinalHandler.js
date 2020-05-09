module.exports = function (req,res) {
    //callback, este apelat cand un request nu a fost tratat nicaieri altundeva
    //in caz ca un request nu a mers bine va fi rezolvat aici
    //request la o ruta inexistenta
    const obj = {
        success: false,
        message: `Request could not be made at this route. Cannot ${req.method} at ${req.url} `
    };
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 403; //Forbidden
    res.end(JSON.stringify(obj));
};