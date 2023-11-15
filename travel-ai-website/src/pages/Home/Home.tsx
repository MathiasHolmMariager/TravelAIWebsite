import "./Home.css";
import { useState, useEffect } from "react";
//Function that saves a boolean value in local storage

function App() {
  const [showBanner, setShowBanner] = useState(() => {
    const data = window.localStorage.getItem("WELCOME_BANNER");
    return data !== null ? JSON.parse(data) : true;
  });
  

  useEffect(() => {
    const data = window.localStorage.getItem("WELCOME_BANNER");
    if (data !== null) setShowBanner(JSON.parse(data));
    console.log("data", data);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("WELCOME_BANNER", JSON.stringify(showBanner));
  }, [showBanner]);

  return (
    <div>
      <button onClick={() => setShowBanner(false)}>False</button>
      <button onClick={() => setShowBanner(true)}>True</button>
    </div>
  );
}

App;

//Function that saves a string value in local storage
function AppString() {
  const [stringValue, setStringValue] = useState(() => {
    const data = window.localStorage.getItem("STRING_VALUE_NAME");
    return data !== null ? data : "";
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setStringValue(() => {
      // Use the previous value to ensure it's the latest value
      window.localStorage.setItem("STRING_VALUE_NAME", newValue);
      return newValue;
    });
  };

  //const handleSaveString = () => {
  //  window.localStorage.setItem("STRING_VALUE_NAME", stringValue);
  //};

  return (
    <div className="Page">
           
      <input
        type="text"
        value={stringValue}
        onChange={handleInputChange}
        className="inputEt"
      />
    </div>
  );
}

export default AppString;
