const render = require('../../utils/renderPage');
const {getCategories} = require('../../models');

module.exports = async (req, res) => {
    res.statusCode = 200;
    // const obj = await getCategories();
    const page = await render('./views/start_page.ejs', {user: req.user});
    return res.end(page);
}