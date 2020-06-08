exports.login = require('./auth/login');
exports.register = require('./auth/register');

exports.suggestion = require('./categories/suggestion');
exports.getCategories = require('./categories/getCategories');

exports.getChartData = require('./data_queries/getChartData');

exports.adminLogin=require('./admin/login');
exports.adminInternal=require('./admin/internal');
exports.adminInternalDelete=require('./admin/internalDelete');
exports.adminManager=require('./admin/manager');
exports.adminPosts=require('./admin/posts');
exports.start=require('./start');
exports.map=require('./map');
exports.adminAccid=require('./admin/accid');
exports.getAccidentById = require('./data_queries/getAccidentById');
