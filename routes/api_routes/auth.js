const Router = require('router');
var router = Router();
const {apiAuthController} = require('../../controllers');

router.post('/login', apiAuthController.login);
router.post('/register', apiAuthController.register);

module.exports = router;