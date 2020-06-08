const Router = require('router');
var router = Router();
const {viewDetailedAccident} = require('../../controllers');

router.get('/', viewDetailedAccident);

module.exports = router;