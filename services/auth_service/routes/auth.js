const Router = require('router');
var router = Router();
const {loginController, registerController} = require('../controllers');

router.post('/login', loginController);
router.post('/register', registerController);

module.exports = router;