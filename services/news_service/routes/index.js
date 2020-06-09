const Router = require('router');
var router = Router();

const {startController} = require('../controllers');
//Middlewares
const {body_parser, set_headers, empty_body} = require('../middlewares');


router.use(body_parser());
router.use(set_headers.forApi());
router.use(empty_body);



router.get('/start', startController);


module.exports = router;