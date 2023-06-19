const {Car} = require('../models/models')

class CarController {
    async create(req, res) {
      console.log("add car")
        const {name} = req.body
        const car = await Car.create({name})
        return res.json(car)
    }

    async getAll(req, res) {
        const cars = await Car.findAll()
        return res.json(cars)
    }

}

module.exports = new CarController()
