const render = require('../../utils/renderPage');


module.exports = async (req, res) => {
    res.statusCode = 200;
    const page = await render('./views/map.ejs', {user: req.user});
    return res.end(page);
};
