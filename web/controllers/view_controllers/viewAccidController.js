module.exports= (req,res) => {
    const page = '<html><head><title>Login Test Page!</title></head><body><h1>I am a login test page!</h1></body></html>';
    res.statusCode = 200;
    return res.end(page);
}

