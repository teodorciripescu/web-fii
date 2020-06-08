const Router = require('router');
var router = Router();

const {mapController} = require('../controllers');
//Middlewares
const {body_parser, set_headers, empty_body} = require('../middlewares');


router.use(body_parser());
router.use(set_headers.forApi());
router.use(empty_body);



router.post('/map', mapController);


module.exports = router;