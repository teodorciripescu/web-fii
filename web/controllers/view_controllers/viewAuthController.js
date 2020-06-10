const render = require('../../utils/renderPage');
exports.login = async (req,res) => {
    res.statusCode = 200;
    const page = await render('./views/auth/login.ejs', {user: req.user});
    return res.end(page);
}


exports.register = async (req,res) => {
    res.statusCode = 200;
    const page = await render('./views/auth/register.ejs', {user: req.user});
    return res.end(page);
}

exports.logout = async (req, res) => {
    res.statusCode = 200;
    const page = await render('./views/auth/logout.ejs', {});
    return res.end(page);
}