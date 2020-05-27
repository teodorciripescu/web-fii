const Router = require('router');
var router = Router();

const {loginController, optionsController, adminManController,accidManController,postsManController} = require('../controllers');
//Middlewares
const {body_parser, set_headers, empty_body} = require('../middlewares');


router.use(body_parser());
router.use(set_headers.forApi());
router.use(empty_body);


router.get('/', loginController);
router.get('/manager', optionsController);
/*

router.get('/internal', adminManController);
router.get('/accidents', accidManController);
router.get('/posts', postsManController);*/

//const auth = require('./auth');
//router.use('/auth',auth);

module.exports = router;