const Router = require('router');
var router = Router();
const {viewAccidController} = require('../../controllers');

router.get('/', viewAccidController);


module.exports = router;