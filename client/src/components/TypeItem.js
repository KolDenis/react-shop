import React, {useContext} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {Context} from "../index";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom"
import {PRODUCTS_ROUTE} from "../utils/consts";

const TypeItem = ({type}) => {
    const history = useHistory()
    const {device} = useContext(Context)

    const click = () => {
      device.setSelectedType(type)
      history.push(PRODUCTS_ROUTE + '/')
    }

    return (
          <Card className="d-flex" style={{width: 350, height: 150, cursor: 'pointer', margin: "auto", marginTop:20}} border={"light"} onClick={click} align="center">
            <Image width={100} height={100} src={process.env.REACT_APP_API_URL + type.img} style={{margin: "auto"}}/>
            <div>{type.name}</div>
          </Card>
    );
};

export default TypeItem;
