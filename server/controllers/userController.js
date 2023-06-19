const MyError = require('../error/MyError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, UserIP, Basket, BasketDevice} = require('../models/models')
const userIpController = require('./userIpController')

const generateJwt = (data) => {
    return jwt.sign(
        data,
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res) {
        const {email, password, role, ip} = req.body
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return res.json(MyError.AlreadyRegistered())
        }
        const userIp = await UserIP.findOne({where: {ip}})
        let basketId
        if(userIp)
        {
          basketId = userIp.basketId
          await UserIP.destroy({where: {ip}})
        }
        else{
          const basket = await Basket.create()
          basketId = basket.id
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword, basketId})
        const token = generateJwt({isAuth: true, id: user.id, email: user.email, role: user.role, basketId: user.basketId})
        return res.json({token})
    }

    async login(req, res) {
        const {email, password, ip} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.json(MyError.NotFoundUser());
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.json(MyError.IncorrectPassword())
        }

        const userIp = await UserIP.findOne({where: {ip}})
        let basketId
        if(userIp)
        {
          basketId = userIp.basketId
          await UserIP.destroy({where: {ip}})
        }
        const basketUserId = await BasketDevice.count({where: {basketId}})
        const basketUser = await BasketDevice.count({where: {basketId: user.basketId}})

        if(basketUserId > 0)
        {
          if(basketUser == 0)
          {
            await User.update({ basketId : basketId },{ where : { basketId : user.basketId}})
            await Basket.destroy({where: {id: user.basketId}})
            //BasketDevice.update({ basketId : basketId },{ where : { basketId : user.basketId }})
          }
          else{
            await BasketDevice.destroy({ where : { basketId : basketId}})
            await Basket.destroy({where: {id: basketId}})
          }
        }
        else{
          await Basket.destroy({where: {id: basketId}})
        }

        const token = generateJwt({isAuth: true, id: user.id, email: user.email, role: user.role, basketId: user.basketId})
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt({isAuth: req.user.isAuth, id: req.user.id, email: req.user.email, role: req.user.role, basketId: req.user.basketId})
        return res.json({token})
    }
}

module.exports = new UserController()
