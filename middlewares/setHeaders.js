exports.forApi = function(){
    return function(req, res, next){
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        next();
    }
};
exports.forPages = function(){
  return function(req, res, next){
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      next();
    }
};
