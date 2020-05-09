const Router = require('router');
var router = Router();

//cream si montam un nou router pentru API-ul nostru
const apiRouter = require('./api_routes');
router.use('/api', apiRouter);

//cream si montam un nou router pentru pagini
const pageRouter = require('./view_routes');
router.use('/', pageRouter);

module.exports = router;