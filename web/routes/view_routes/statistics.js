const Router = require('router');
var router = Router();
const {viewStatisticsController} = require('../../controllers');

router.get('/', viewStatisticsController);

module.exports = router;