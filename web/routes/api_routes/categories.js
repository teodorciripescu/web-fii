const Router = require('router');
var router = Router();
const {apiSuggestionsController, apiCategoriesController} = require('../../controllers');

router.get('/suggestion', apiSuggestionsController);
router.get('/', apiCategoriesController);

module.exports = router;