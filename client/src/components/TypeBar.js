import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Dropdown} from "react-bootstrap";

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return (
      <Dropdown className="mb-2">
          <Dropdown.Toggle  className="w-100">{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
          <Dropdown.Menu>
            {device.types.map(type =>
                <Dropdown.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </Dropdown.Item>
            )}
          </Dropdown.Menu>
      </Dropdown>
    );
});


export default TypeBar;
