import './Home.css'
import NavBar from './components/NavBar';
import {Outlet} from "react-router"
import MyComponent from './TestKnap';


function Home() {
  return <>
  <div className='NavBar'>
    <NavBar/>
  </div>
  <div>
    <MyComponent/>
  </div>
  <Outlet/>
  </>
}

export default Home