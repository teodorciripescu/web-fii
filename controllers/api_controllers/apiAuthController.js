exports.login = (req, res) => {
    // console.log(req.body);
    const obj = {success: true, message:'This is a Login test' };
    res.statusCode = 200;
    res.end(JSON.stringify(obj));
};

exports.register = (req, res) => {
    // console.log(req.body);
    const obj = {success: true, message:'This is a Register test' };
    res.statusCode = 200;
    res.end(JSON.stringify(obj));
};