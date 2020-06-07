const Router = require('router');
var router = Router();
const {viewAuthController} = require('../../controllers');

router.get('/login', viewAuthController.login);
router.get('/register', viewAuthController.register);
router.get('/logout', viewAuthController.logout);

module.exports = router;