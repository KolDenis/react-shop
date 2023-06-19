const {BasketDevice, Device} = require('../models/models')
const CloudIpsp = require('cloudipsp-node-js-sdk')

const fondy = new CloudIpsp(
{
  merchantId: 1396424,
  secretKey: 'test'
})

class BasketController {
    async add(req, res) {
        const {deviceId, count} = req.body
        const user = req.user
        const brand = await BasketDevice.create({count, basketId: user.basketId, deviceId})
        return res.json(brand)
    }

    async getAll(req, res) {
        const user = req.user
        const bdevices = await BasketDevice.findAndCountAll({where: {basketId: user.basketId}})
        const r = {
          count: bdevices.count,
          rows: []
        }
        for(let i = 0; i < bdevices.count; i++)
        {
          const device = await Device.findOne({where: {id: bdevices.rows[i].deviceId}})
          r.rows[i] = {id: bdevices.rows[i].id,
                    name: device.name,
                    count: bdevices.rows[i].count,
                    prise: device.price,
                    img1: device.img1}
        }
        return res.json(r)
    }

    async removeOne(req, res) {
        const {id} = req.body
        const user = req.user
        const brand = await BasketDevice.destroy({where: {id, basketId: user.basketId}})
        return res.json(brand)
    }

    async clear(req, res) {
        const user = req.user
        const brand = await BasketDevice.destroy({where: {basketId: user.basketId}})
        return res.json(brand)
    }


    async pay(req, res) {
      /*const requestData = {
        order_id: 'Your Or',
        order_desc: 'test order',
        currency: 'USD',
        amount: '100'
      }

      fondy.Checkout(requestData).then(data => {
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })*/
      return res
    }

}

module.exports = new BasketController()
