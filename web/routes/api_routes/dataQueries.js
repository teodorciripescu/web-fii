const Router = require('router');
var router = Router();
const {apiChartController} = require('../../controllers');

router.post('/', apiChartController);

module.exports = router;