const Router = require('router');
var router = Router();
const {apiAdminController} = require('../../controllers');

//router.get('/admin', apiAdminController);
router.post('/login', apiAdminController.login);
router.post('/internal', apiAdminController.internal);


module.exports = router;