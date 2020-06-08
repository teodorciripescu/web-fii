const render = require('../../utils/renderPage');

exports.login = async (req, res) => {
    res.statusCode = 200;

    const page = await render('./views/admin_view/adminpage.ejs', {});
    return res.end(page);
};

exports.manager = async (req, res) => {
    res.statusCode = 200;
    const page = await render('./views/admin_view/admin_options.ejs', {});
    return res.end(page);
};

exports.internal = async (req, res) => {
    res.statusCode = 200;
    const page = await render('./views/admin_view/admin_internal.ejs', {});
    return res.end(page);
};

exports.posts = async (req, res) => {
    res.statusCode = 200;
    const page = await render('./views/admin_view/admin_posts.ejs', {});
    return res.end(page);
};

exports.accid = async (req, res) => {
    res.statusCode = 200;
    const page = await render('./views/admin_view/admin_accid.ejs', {});
    return res.end(page);
};