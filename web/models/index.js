exports.login = require('./auth/login');
exports.register = require('./auth/register');

exports.suggestion = require('./categories/suggestion');
exports.getCategories = require('./categories/getCategories');

exports.getChartData = require('./data_queries/getChartData');

exports.adminLogin=require('./admin/login');
exports.adminInternal=require('./admin/internal');
exports.adminInternalDelete=require('./admin/internalDelete');