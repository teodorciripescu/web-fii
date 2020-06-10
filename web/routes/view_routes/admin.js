const Router = require('router');
var router = Router();
const {adminViewController} = require('../../controllers');

const {require_auth_admin} = require('../../middlewares');
router.use(require_auth_admin);
router.get('/', adminViewController.login);
//router.get('/login', adminViewController.login);
router.get('/manager', adminViewController.manager);
router.get('/internal', adminViewController.internal);
router.get('/posts', adminViewController.posts);
router.use('/accid', adminViewController.accid);

module.exports = router;