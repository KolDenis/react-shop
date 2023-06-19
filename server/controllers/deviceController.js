const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo, DeviceCar, Images} = require('../models/models')
const MyError = require('../error/MyError');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, carId, info} = req.body
            const {imgFile1, imgFile2, imgFile3, imgFile4} = req.files
			console.log(imgFile1)

            let imgFiles = [imgFile1, imgFile2, imgFile3, imgFile4]
            let imgNames = [null, null, null, null]
            for(let i = 0; i < imgFiles.length; i++)
            {
              if(imgFiles[i])
              {
                var fileName = uuid.v4() + ".jpg"
                imgFiles[i].mv(path.resolve(__dirname, '..', 'static', fileName))
                imgNames[i] = fileName
              }
            }

            const device = await Device.create({name, price, brandId, typeId, img1: imgNames[0], img2: imgNames[1], img3: imgNames[2], img4: imgNames[3]});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            for(let i = 0; i < carId.length; i++)
            {
              DeviceCar.create({
                carId: carId[i],
                deviceId: device.id
              })
            }

            return res.json(device)
        } catch (e) {
            res.json(MyError.Message(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, carId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
}

module.exports = new DeviceController()
