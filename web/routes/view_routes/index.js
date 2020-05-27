const Router = require('router');
const ejs = require('ejs');
var router = Router();

//Middlewares
const {set_headers} = require('../../middlewares');
router.use(set_headers.forPages());

const {mainPageController} = require('../../controllers');
router.get('/', mainPageController);

const auth = require('./auth');
router.use('/',auth);

const admin = require('./admin');
router.use('/admin', admin);

module.exports = router;