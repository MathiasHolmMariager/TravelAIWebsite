import "./Home.css";

import NumberInput from "../../components/NumberPersons";
import Calender from "../../components/Calender";
import InputTest from "../../components/InputTest";


function AppString() {
  return (
    <div className="Page">
      <NumberInput />
      <Calender />
      <InputTest />
    </div>
  );
}

export default AppString;
