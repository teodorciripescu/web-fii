const Router = require('router');
var router = Router();
const {apiCategoriesController} = require('../../controllers');

router.get('/suggestion', apiCategoriesController.suggestion);

module.exports = router;