import './Fly.css'
import MyComponent from './TestKnap'
import { MyProvider } from './MyContext'
import FlightsComponent from './FlightTickets'
import Calender from '../../components/Calender'
import NumberInput from '../../components/NumberPersons'
import DepartFromInput from '../../components/DepartFrom'
import DepartToInput from '../../components/DepartTo'

function Fly() {
  return ( 
    <div className='flyPage'>
      <div className="horizontal-row">
        <div className='from'><DepartFromInput /></div>
        <div className='to'><DepartToInput /></div>
        <div className='cal'><Calender /></div>
        <div className='num'><NumberInput /></div>
        <div className='sog'></div>
      </div>
      <div className='rest'>
        <MyProvider>
        <MyComponent/>
        <div className='liste'><FlightsComponent/></div> 
        </MyProvider>
      </div>  
    </div> 
    
    
  )
}


export default Fly
