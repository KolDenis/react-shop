import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Dropdown} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <Dropdown className="mb-2">
            <Dropdown.Toggle className="w-100">{device.selectedBrand.name || "Бренд"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand =>
                  <Dropdown.Item
                      style={{cursor:'pointer'}}
                      key={brand.id}
                      onClick={() => device.setSelectedBrand(brand)}
                      border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                  >
                      {brand.name}
                  </Dropdown.Item>
              )}
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default BrandBar;
