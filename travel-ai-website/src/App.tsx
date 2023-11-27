import './App.css'
import HorizontalLinearStepper from './components/MuiNavBar'
import {Outlet} from "react-router"


function App() {
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