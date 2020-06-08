const render = require('../../utils/renderPage');
const {getCategories} = require('../../models');

module.exports = async (req, res) => {
    res.statusCode = 200;
    const obj = await getCategories();
    const page = await render('./views/table_data_view/index.ejs', {categories:obj.data, user: req.user});
    return res.end(page);
}