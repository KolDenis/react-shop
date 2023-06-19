const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const verifyTokenMiddleware = require('../middleWare/verifyTokenMiddleware')

router.post('/add', verifyTokenMiddleware, basketController.add)
router.post('/pay', verifyTokenMiddleware, basketController.pay)
router.get('/', verifyTokenMiddleware, basketController.getAll)
router.post('/removeOne', verifyTokenMiddleware, basketController.removeOne)
router.post('/clear', verifyTokenMiddleware, basketController.clear)

module.exports = router
