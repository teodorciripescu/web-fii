const {parseCookies} = require('../../utils/cookies');
const {decodeToken} = require('../../utils/jwtUtils');

module.exports = async (req, res) => {

    var cookies = await parseCookies(req);
    console.log("cook:"+cookies);

    ///decodam tokenul=verificam daca se afla in baza de date=utilizatorul are dreptul de a intra pe pagina
    //altfel -trimitere la pagina de login admini
    //-sau la o pagina de eroare

};