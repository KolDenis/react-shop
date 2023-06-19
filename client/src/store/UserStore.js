import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._basket = []
        this._basketCount = 0
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setBasket(basket) {
      if(basket)
      {
        this._basket = basket.rows
        this._basketCount = basket.count
      }
      else{
        this._basket = []
        this._basketCount = 0
      }

    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get basket(){
        return this._basket
    }
    get basketCount(){
        return this._basketCount
    }

    nullBasket()
    {
      this._basket = []
      this._basketCount = 0
    }
}
