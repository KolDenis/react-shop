import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import TypeItem from "./TypeItem";
import Container from "react-bootstrap/Container";

const TypeList = observer(() => {
    const {device} = useContext(Context)

    return (
      <div className="d-flex" style={{flexWrap: "wrap"}}>
        {device.types.map(type =>
            <TypeItem key={type.id} type={type}/>
        )}
      </div >
    );
});

export default TypeList;
