const Router = require('router');
var router = Router();
const {filterController, getCategoriesController, getSuggestionController} = require('../controllers');
//Middlewares
const {body_parser, set_headers, empty_body} = require('../middlewares');
router.use(body_parser());
router.use(set_headers.forApi());
router.use(empty_body);
router.post('/', filterController);
router.get('/', getCategoriesController);
router.get('/categories/suggestion', getSuggestionController);
//const auth = require('./auth');
//router.use('/auth',auth);

module.exports = router;