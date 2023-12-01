/*import { useEffect } from 'react';*/
import './App.css'
import HorizontalLinearStepper from './components/MuiNavBar'
import {Outlet} from "react-router"


function App() {
  /*useEffect(() => {
    const handleBeforeUnload = () => {
      // Reset the localStorage value when the browser is closed
      localStorage.removeItem('TO_DATE');
    };

    // Attach the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);*/

  return <>
  <div className='Page'>
    <div className='NavBar'>
      <HorizontalLinearStepper/>
    </div>
    <div className='PageContent'>
      <Outlet/>
    </div>
  </div>
  </>
}

export default App