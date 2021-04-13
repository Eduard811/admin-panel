const Router = require('express')
const router = new Router()
const teammateController = require('../controllers/teammateController')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/', roleMiddleware(['ADMIN']), teammateController.create)
router.get('/', teammateController.getAll)
router.get('/:id', teammateController.getOne)
router.put('/', teammateController.update)
router.delete('/:id', teammateController.delete)

module.exports = router