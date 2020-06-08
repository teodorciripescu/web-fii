const Router = require('router');
var router = Router();
const {viewMapController} = require('../../controllers');

router.get('/', viewMapController);


module.exports = router;