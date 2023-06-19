import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeList from "../components/TypeList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchTypes, fetchCars, fetchImages} from "../http/deviceAPI";

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchCars().then(data => device.setCars(data))
    }, [])

    return (
        <Container>
          <TypeList />
        </Container>
    );
});

export default Shop;
