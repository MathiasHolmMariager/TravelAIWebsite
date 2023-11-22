import "./Home.css";

import NumberInput from "../../components/NumberPersons";
import Calender from "../../components/Calender";
import InputTest from "../../components/InputTest";

function AppString() {
  return (
    <div className="Page">
      <div className="horizontal-row">
        <InputTest />
        <Calender />
        <NumberInput />
      </div>
    </div>
  );
}

export default AppString;

