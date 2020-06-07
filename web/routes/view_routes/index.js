const Router = require('router');
const ejs = require('ejs');
var router = Router();

//Middlewares
const {set_headers, require_auth} = require('../../middlewares');
router.use(set_headers.forPages());
router.use(require_auth);
const {mainPageController} = require('../../controllers');
router.get('/', mainPageController);

const auth = require('./auth');
router.use('/',auth);

module.exports = router;