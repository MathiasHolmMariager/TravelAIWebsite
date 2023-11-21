import './Fly.css'
import MyComponent from './TestKnap'
import { MyProvider } from './MyContext'
import FlightsComponent from './FlightTickets'


function Fly() {
  return (  
    <MyProvider>
      Fly siden
      <MyComponent/>
      <FlightsComponent/>
    </MyProvider>
    
  )
}


export default Fly
