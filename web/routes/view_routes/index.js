const Router = require('router');
const ejs = require('ejs');
var router = Router();

//Middlewares
const {set_headers, require_auth} = require('../../middlewares');
router.use(set_headers.forPages());
router.use(require_auth);
const {mainPageController} = require('../../controllers');
router.get('/', mainPageController);

const {startPageController} = require('../../controllers');
router.get('/start', startPageController);

const auth = require('./auth');
router.use('/',auth);

const admin = require('./admin');
router.use('/admin', admin);

const map = require('./map');
router.use('/map', map);



const statistics = require('./statistics');
router.use('/statistics', statistics);

const columnsDescription = require('./columnsDescription');
router.use('/columns', columnsDescription);

const table = require('./table');
router.use('/table', table);

const detailedAccident = require('./detailedAccident');
router.use('/accident', detailedAccident);

const about = require('./about');
router.use('/about', about);

module.exports = router;