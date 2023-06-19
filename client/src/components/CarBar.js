import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Dropdown} from "react-bootstrap";

const CarBar = observer(() => {
    const {device} = useContext(Context)
    return (
      <Dropdown className="mb-2">
          <Dropdown.Toggle  className="w-100">{device.selectedCar.name || "Выберите машину"}</Dropdown.Toggle>
          <Dropdown.Menu>
            {device.cars.map(car =>
                <Dropdown.Item
                    style={{cursor: 'pointer'}}
                    active={car.id === device.selectedCar.id}
                    onClick={() => device.setSelectedCar(car)}
                    key={car.id}
                >
                    {car.name}
                </Dropdown.Item>
            )}
          </Dropdown.Menu>
      </Dropdown>
    );
});


export default CarBar;
