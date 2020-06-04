const {adminLogin} = require('../../models');
const {adminInternal} = require('../../models');
const {adminInternalDelete} = require('../../models');
const {adminPosts} = require('../../models');

exports.login = async (req, res) => {
    const obj = await adminLogin(req.body);
    console.log(obj);
    res.statusCode = obj.status;

    return res.end(JSON.stringify(obj));
};


exports.internal = async (req, res) => {
    const obj = await adminInternal(req.body);
    console.log(obj);
    res.statusCode = obj.status;

    return res.end(JSON.stringify(obj));
};


exports.internalDelete = async (req, res) => {
    const obj = await adminInternalDelete(req.body);
    console.log(obj);
    res.statusCode = obj.status;

    return res.end(JSON.stringify(obj));
};

exports.manager = async (req, res) => {
    const obj = await adminManager(req.body);
    console.log(obj);
    res.statusCode = obj.status;

    return res.end(JSON.stringify(obj));
};

exports.posts = async (req, res) => {
    const obj = await adminPosts(req.body);
    console.log(obj);
    res.statusCode = obj.status;

    return res.end(JSON.stringify(obj));
};