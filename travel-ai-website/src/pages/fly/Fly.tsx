import './Fly.css'
import MyComponent from './TestKnap'
import { MyProvider } from './MyContext'
import FlightsComponent from './FlightTickets'
import Calender from '../../components/Calender'
import NumberInput from '../../components/NumberPersons'
import DepartFromInput from '../../components/DepartFrom'
import DepartToInput from '../../components/DepartTo'
import { useEffect} from 'react'

function formatDateISO8601(selectedDate: any): string {
  // Example implementation, adjust it based on your requirements
  const year = selectedDate.getFullYear();
  const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = selectedDate.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}


function Fly() {

  //sikre at hvis der ikk er gemt noget i local storage vil den gemme mindst 1 adult når man loader pagen
  useEffect(() => {
    const handlePageLoad = () => {
      const adults = parseInt(localStorage.getItem('adults') ?? '0', 10);
      const kids = parseInt(localStorage.getItem('kids') ?? '0', 10);
      if (adults + kids === 0) {
        localStorage.setItem('adults', '1');
      }
  
      const storedFromDate = localStorage.getItem('FROM_DATE');
      if (storedFromDate === null || storedFromDate === undefined) {
        const currentDate = new Date();
        const formattedDate = formatDateISO8601(currentDate);
        localStorage.setItem('FROM_DATE', formattedDate);
      }

      const storedToDate = localStorage.getItem('TO_DATE');
      if (storedToDate === null || storedToDate === undefined) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1); 
        const formattedDate = formatDateISO8601(currentDate);
        localStorage.setItem('TO_DATE', formattedDate);
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


