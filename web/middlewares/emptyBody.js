module.exports=function (req, res, next) {
    if (req.method === 'POST' && JSON.stringify(req.body) === JSON.stringify({})) {
        res.statusCode = 400;
        res.end(JSON.stringify({success: false, message: "Body is empty."}));
    }
    next();
}
