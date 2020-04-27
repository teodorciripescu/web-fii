const Router = require('router');
var router = Router();

//Middlewares
const {set_headers} = require('../../middlewares');
router.use(set_headers.forPages());

router.get('/', function (req, res) {
    const page = '<html><head><title>Test Page!</title><body><h1>I am a test page!</h1></body></head></html>';
    res.statusCode = 200;
    res.end(page);
});

module.exports = router;