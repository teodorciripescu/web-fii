const Router = require('router');
var router = Router();

const {loginController, optionsController, internalController,accidController,postsController} = require('../controllers');
//Middlewares
const {body_parser, set_headers, empty_body} = require('../middlewares');


router.use(body_parser());
router.use(set_headers.forApi());
router.use(empty_body);


router.post('/login', loginController);
router.get('/manager', optionsController);
router.post('/internal', internalController);
router.post('/internalDelete', internalController);
router.post('/posts', postsController);
router.post('/accid', accidController);


module.exports = router;