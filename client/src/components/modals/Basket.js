import React, {useState, useEffect, useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, ListGroup, Image, Row, Col} from "react-bootstrap";
import {fetchBasket, makePayment, removeDeviceFromBasket, clearBasketQuery} from "../../http/userAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ipsp = "https://pay.fondy.eu/static_common/v1/checkout/ipsp.js";

const Basket = observer(({show, onHide}) => {
  const {user, device} = useContext(Context)

    useEffect(() => {
        fetchBasket().then(data => {user.setBasket(data)})
      }, [])

    const pay = () => {
      makePayment().then(data => {onHide()})
    }

    const removeDevFromBasket = (id) => {
      removeDeviceFromBasket(id).then(data => {
        fetchBasket().then(data => {user.setBasket(data)})
      })
    }

    const clearBasket = () => {
      clearBasketQuery().then(data => {user.setBasket()})
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Корзина
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ListGroup>
              {user.basket.map(item =>
                  <ListGroup.Item key={item.id}>
                    <Row>
                      <Col><Image style={{width:50, height: 50}} src={process.env.REACT_APP_API_URL + item.img1}/></Col>
                      <Col style={{margin: "auto"}}>{item.name}</Col>
                      <Col style={{margin: "auto"}}>{item.prise}</Col>
                      <Col style={{margin: "auto"}}>{item.count}</Col>
                      <Button variant="outline-danger" onClick={()=>{removeDevFromBasket(item.id)}}>удалить</Button>
                    </Row>
                  </ListGroup.Item>
              )}
            </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-danger" onClick={clearBasket}>Очистить</Button>
                <Button variant="outline-success" onClick={pay}>Оплатить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default Basket;
