const Router = require('router');
var router = Router();
const {viewAboutController} = require('../../controllers');

router.get('/', viewAboutController);

module.exports = router;