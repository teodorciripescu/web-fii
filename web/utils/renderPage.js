const ejs = require('ejs');

module.exports = function(viewPath, data){
    return new Promise((resolve) => {
        ejs.renderFile(viewPath, data, function (err,str) {
            if(err)resolve(err.toString());
            resolve(str);
        });
    });
}