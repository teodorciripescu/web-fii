const Router = require('router');
var router = Router();
const {viewTableController} = require('../../controllers');

router.get('/', viewTableController);

module.exports = router;