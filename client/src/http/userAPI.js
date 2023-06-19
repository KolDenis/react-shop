import {$hostToken, $host} from "./index";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const registration = async (email, password) => {
    const res = await axios.get('https://geolocation-db.com/json/');
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN', ip: res.data.IPv4})
    localStorage.setItem('token', data.token)
    return data
}

export const login = async (email, password) => {
    const res = await axios.get('https://geolocation-db.com/json/');
    const {data} = await $host.post('api/user/login', {email, password, ip: res.data.IPv4})
    localStorage.setItem('token', data.token)
    return data
}

export const check = async () => {
    const {data} = await $hostToken.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getOrReg = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    const {data} = await $hostToken.post('api/userIp/getOrReg', {ip: res.data.IPv4})
    localStorage.setItem('token', data.token)
    return data
}

export const logOut = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    const {data} = await $host.post('api/userIp/getOrReg', {ip: res.data.IPv4})
    localStorage.setItem('token', data.token)
    return data
}

export const addToBasket = async (deviceId, count) => {
    const {data} = await $hostToken.post('api/basket/add', {deviceId, count})
    return data
}

export const fetchBasket = async () => {
    const {data} = await $hostToken.get('api/basket')
    return data
}

export const removeDeviceFromBasket = async (id) => {
    const {data} = await $hostToken.post('api/basket/removeOne', {id})
    return data
}

export const clearBasketQuery = async () => {
    const {data} = await $hostToken.post('api/basket/clear')
    return data
}

export const makePayment = async () => {
    const {data} = await $hostToken.post('api/basket/pay')
    return data
}
