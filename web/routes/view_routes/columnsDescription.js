const Router = require('router');
var router = Router();
const {viewColumnsDescriptionController} = require('../../controllers');

router.get('/', viewColumnsDescriptionController);

module.exports = router;