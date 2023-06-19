const Router = require('express')
const router = new Router()
const userIpController = require('../controllers/userIpController')

/*router.post('/registration', userIpController.registration)
router.get('/get', userIpController.getOne)*/
router.post('/getOrReg', userIpController.getOrReg)

module.exports = router
