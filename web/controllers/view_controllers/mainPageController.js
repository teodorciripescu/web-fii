const render = require('../../utils/renderPage');
const {getCategories} = require('../../models');

module.exports = async (req, res) => {
    res.statusCode = 200;
    const obj = await getCategories();
    const page = await render('./views/data_view/index.ejs', {categories:obj.data});
    return res.end(page);
}