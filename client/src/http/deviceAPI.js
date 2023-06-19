import {$hostToken, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $hostToken.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $hostToken.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createCar = async (car) => {
    const {data} = await $hostToken.post('api/car', car)
    return data
}

export const fetchCars = async () => {
    const {data} = await $host.get('api/car')
    return data
}

export const createDevice = async (device) => {
    const {data} = await $hostToken.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, carId, page, limit= 5) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, carId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}
