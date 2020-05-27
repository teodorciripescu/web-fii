const Router = require('router');
var router = Router();
const {adminViewController} = require('../../controllers');

router.get('/', adminViewController.login);
//router.get('/login', adminViewController.login);
router.get('/manager', adminViewController.manager);
router.get('/internal', adminViewController.internal);
router.get('/posts', adminViewController.posts);
router.get('/accid', adminViewController.accid);

module.exports = router;