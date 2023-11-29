import './Fly.css'
import MyComponent from './TestKnap'
import { MyProvider } from './MyContext'
import FlightsComponent from './FlightTickets'
import Calender from '../../components/Calender'
import NumberInput from '../../components/NumberPersons'
import DepartFromInput from '../../components/DepartFrom'
import DepartToInput from '../../components/DepartTo'
import { useEffect } from 'react'

function Fly() {

  //sikre at hvis der ikk er gemt noget i local storage vil den gemme mindst 1 adult når man loader pagen
  useEffect(() => {
    const handlePageLoad = () => {
      const adults = parseInt(localStorage.getItem('adults') ?? '0', 10);
      const kids = parseInt(localStorage.getItem('kids') ?? '0', 10);
      if (adults + kids === 0) {
        localStorage.setItem('adults', '1');
      }
    };
    handlePageLoad();
  }, []);


  return ( 
    <div className='flyPage'>
      <MyProvider>
      <div className="horizontal-row">
        <div className='from'><DepartFromInput /></div>
        <div className='to'><DepartToInput /></div>
        <div className='cal'><Calender /></div>
        <div className='num'><NumberInput /></div>
        <div className='sog'><MyComponent/></div>
      </div>
      <div className='rest'>
        <div className='liste'><FlightsComponent/></div> 
      </div>  
      </MyProvider>
    </div> 
  )
}

export default Fly
