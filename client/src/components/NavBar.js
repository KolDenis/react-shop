import React, {useContext, useState} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import Basket from "./modals/Basket"
import {getOrReg, logOut} from "../http/userAPI";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const [basketVisible, setBasketVisible] = useState(false)

    const logOutThis = () => {
      logOut().then(data => {
          user.setUser(data)
          user.setIsAuth(false)
      })
      user.nullBasket()
    }

    const openBasket = () => {
      setBasketVisible(true)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={SHOP_ROUTE}>Автозапчасти</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOutThis()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
                <Button
                    variant={"outline-light"}
                    onClick={() => openBasket()}
                    className="ml-2"
                >
                    Корзина
                </Button>

                <Basket show={basketVisible} onHide={() => setBasketVisible(false)}/>
            </Container>
        </Navbar>

    );
});

export default NavBar;
