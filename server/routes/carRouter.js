const Router = require('express')
const router = new Router()
const carController = require('../controllers/carController')

router.post('/', carController.create)
router.get('/', carController.getAll)

module.exports = router
