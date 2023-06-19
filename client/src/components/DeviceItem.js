import React, {useContext} from 'react';
import {Card, Col} from "react-bootstrap";
import {Image, Button} from "react-bootstrap";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import {fetchBasket} from "../http/userAPI";
import {Context} from "../index";

const DeviceItem = ({device}) => {
    const history = useHistory()
    const {user} = useContext(Context)

    return (
        <Col md={3} className={"mt-3"} style={{width:150}} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{cursor: 'pointer'}} border={"light"}>
                <Image src={process.env.REACT_APP_API_URL + device.img1}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div>{device.id}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
