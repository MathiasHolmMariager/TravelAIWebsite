import './Home.css'
import NavBar from './components/NavBar';
import {Outlet} from "react-router"


function Home() {
  return <>
  <div className='NavBar'>
    <NavBar/>
  </div>
  
  <Outlet/>
  </>
}

export default Home