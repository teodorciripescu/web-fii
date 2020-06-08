const Router = require('router');
var router = Router();
const {apiMapController} = require('../../controllers');

router.post('/', apiMapController);


module.exports = router;