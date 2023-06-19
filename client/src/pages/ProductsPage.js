import React, {useContext, useState, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FiltersBar from "../components/FiltersBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes, fetchCars, fetchImages} from "../http/deviceAPI";
import Pages from "../components/Pages";

const Products = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchCars().then(data => device.setCars(data))
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.selectedCar.id, device.page).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand, device.selectedCar])

    return (
        <Container>
            <Row className="flex-d">
              <h3 style={{margin: "auto"}}>{device.selectedType.name}</h3>
            </Row>
            <Row className="mt-2">
                <Col md={3}>
                    <FiltersBar/>
                </Col>
                <Col md={9}>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Products;
