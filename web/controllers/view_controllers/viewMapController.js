const render = require('../../utils/renderPage');


module.exports = async (req, res) => {
    res.statusCode = 200;
    const page = await render('./views/map.ejs', {});
    return res.end(page);
};
