const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const userIpRouter = require('./userIpRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const carRouter = require('./carRouter')
const basketRouter = require('./basketRouter')

router.use('/user', userRouter)
router.use('/userIp', userIpRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/car', carRouter)
router.use('/basket', basketRouter)

module.exports = router 
