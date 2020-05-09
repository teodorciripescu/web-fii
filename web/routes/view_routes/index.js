const Router = require('router');
var router = Router();

//Middlewares
const {set_headers} = require('../../middlewares');
router.use(set_headers.forPages());

router.get('/', function (req, res) {
    const page = '<html><head><title>Test Page!</title></head><body><h1>I am a test page!</h1></body></html>';
    res.statusCode = 200;
    res.end(page);
});

const auth = require('./auth');
router.use('/',auth);

module.exports = router;