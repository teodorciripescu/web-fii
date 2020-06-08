const url = require('url');
const render = require('../../utils/renderPage');
const {getAccidentById} = require('../../models');

module.exports = async (req, res) => {
    res.statusCode = 200;
    const url_parts = url.parse(req.url, true);
    const params = url_parts.query;
    const obj = await getAccidentById(params.id);
    const page = await render('./views/detailed_accident/index.ejs', {accident: obj.data, user: req.user});
    return res.end(page);
}