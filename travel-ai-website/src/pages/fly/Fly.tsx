import './Fly.css'
import MyComponent from './TestKnap'
import { MyProvider } from './MyContext'
import FlightsComponent from './FlightTickets'
import InputTest from '../../components/InputTest'
import Calender from '../../components/Calender'
import NumberInput from '../../components/NumberPersons'


function Fly() {
  return ( 
    <div>
      <MyProvider>
      Fly siden
      <MyComponent/>
      <FlightsComponent/>
      </MyProvider>
      <div className="horizontal-row">
        <InputTest />
        <Calender />
        <NumberInput />
      </div>
    </div> 
    
    
  )
}


export default Fly
