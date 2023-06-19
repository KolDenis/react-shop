import {observer} from "mobx-react-lite";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import CarBar from "../components/CarBar";

const FiltersBar = observer(() => {
    return (
      <div className="border">
        {/*<TypeBar/>*/}
        <BrandBar/>
        <CarBar/>
      </div>
    );
});

export default FiltersBar;
