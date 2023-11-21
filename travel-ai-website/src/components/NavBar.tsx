import reactLogo from '../assets/react.svg';
import {Link} from "react-router-dom"
import "./NavBar.css"
import "../pages/fly/FlightTickets.css"

// npm i react-router-dom
function NavBar() {
  return (
    <div className="navbar">
      <div className="leftSide">
        <Link to="/">
        <img src={reactLogo} className="logoreact" alt="React logo"/>
        </Link>
        
        
      </div>
      <div className="rightSide">        
        <Link to="/fly">Fly side </Link>

        <Link to="/hotel">Hotel side </Link>

        <Link to="/oplevelser">Oplevelser side </Link>
      </div>
    </div>
  );
}

export default NavBar;
