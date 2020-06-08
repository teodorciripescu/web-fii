const render = require('../../utils/renderPage');


module.exports = async (req, res) => {
    res.statusCode = 200;
    const page = await render('./views/start_page.ejs', {});
    return res.end(page);
};
