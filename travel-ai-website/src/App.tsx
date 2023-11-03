import './App.css'
import NavBar from './components/NavBar';
import {Outlet} from "react-router"


function App() {
  return <>
  <div className='NavBar'>
    <NavBar/>
  </div>
  <Outlet/>
  </>
}

export default App