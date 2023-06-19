const MyError = require('../error/MyError');
const {UserIP, Basket} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt24 = (data) => {
    return jwt.sign(
        data,
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

const generateJwt = (data) => {
    return jwt.sign(
        data,
        process.env.SECRET_KEY
    )
}

class UserIPController {
    async getOrReg(req, res) {

      let decoded

      if(req.headers.authorization)
      {
        try{
          const tokenGot = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
          if (tokenGot) {
            decoded = jwt.verify(tokenGot, process.env.SECRET_KEY)
            if(decoded){
              if(decoded.isAuth)
              {
                const token = generateJwt24({isAuth: decoded.isAuth, id: decoded.id, email: decoded.email, role: decoded.role, basketId: decoded.basketId})
                return res.json({token})
              }
              else{
                const token = generateJwt({isAuth: decoded.isAuth, id: decoded.id, basketId: decoded.basketId})
                return res.json({token})
              }
            }
          }
        }catch{}
      }


      const {ip} = req.body
      let user = await UserIP.findOne({where: {ip}})
      if(!user){
        const basket = await Basket.create({})
        user = await UserIP.create({ip, basketId: basket.id})
      }

      const token = generateJwt({isAuth: false, id: user.id, basketId: user.basketId})

      return res.json({token})
    }
}

module.exports = new UserIPController()
