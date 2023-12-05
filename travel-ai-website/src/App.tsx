/*import { useEffect } from 'react';*/
import { useEffect } from "react";
import "./App.css";
import HorizontalLinearStepper from "./components/MuiNavBar";
import { Outlet } from "react-router";

//clear all storage when you close browser

function App() {
  /*useEffect(() => {
    const handleBeforeUnload = () => {

      localStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);*/

  return (
    <>
      <div className="Page">
        <div className="NavBar">
          <HorizontalLinearStepper />
        </div>
        <div className="PageContent">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
