const Router = require('router');
var router = Router();

//Middlewares
const {body_parser, set_headers, empty_body} = require('../../middlewares');
router.use(body_parser());
router.use(set_headers.forApi());
router.use(empty_body);


router.get('/', function (req, res) {
    const obj = {success: true, status:'active' };
    res.statusCode = 200;
    res.end(JSON.stringify(obj));
});

const auth = require('./auth');
router.use('/auth',auth);
const categories = require('./categories');
router.use('/categories', categories);
module.exports = router;