const Router = require('router');
var router = Router();
const {apiAdminController} = require('../../controllers');

//router.get('/admin', apiAdminController);
router.post('/login', apiAdminController.login);
router.post('/posts', apiAdminController.posts);
router.get('/manager', apiAdminController.manager);
router.post('/internalInsert', apiAdminController.internal);
router.post('/internalDelete', apiAdminController.internalDelete);
router.post('/accid', apiAdminController.accid);


module.exports = router;