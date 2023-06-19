class MyError extends Error{
    constructor(state, message) {
        super();
        this.state = state
        this.message = message
    }

    static NotFoundUser() {
        return new MyError(1, "Пользователь с таким именем не найден")
    }
    static IncorrectPassword() {
        return new MyError(2, "Неверный пароль")
    }
    static AlreadyRegistered() {
        return new MyError(3, "Пользовательс таким email зарегестрирован")
    }
    static Message(mes) {
        return new MyError(0, mes)
    }
}

module.exports = MyError
