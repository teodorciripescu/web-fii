const Router = require('router');
var router = Router();
const {apiStartController} = require('../../controllers');

router.get('/', apiStartController);


module.exports = router;