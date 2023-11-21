import './App.css'
import HorizontalLinearStepper from './components/MuiNavBar'
import {Outlet} from "react-router"


function App() {
  return <>
  <div className='NavBar'>
    <HorizontalLinearStepper/>
  </div>

  <Outlet/>
  </>
}

export default App