import { List, ListItem, ListItemText } from '@mui/material';
import { useMyContext } from './MyContext';
import './FlightTickets.css';

function FlightsComponent() {
  const { sortedArray, buttonClicked} = useMyContext();

  const handleListClick = (item: any) => {
    console.log('Clicked list:', item);
  };

  return (
    <div className={buttonClicked ? 'fixedBox' : 'fixedBox hidden'}>
      {sortedArray.map((item, index) => (
        <div key={index} onClick={() => handleListClick(item)} className='listContainer'>
          <List>
            <ListItem>
              <ListItemText>
                  <ul>
                    <p className='price'>Total price:<br/>{item.total_amount} {item.total_currency}</p>
                    <p>{item.owner_name}</p>
                    <img className='imgCSS' src={item.owner_logo}/>
                    <p>
                      Trip to destination: {item.departing_time_away.toLocaleDateString()} {item.departing_time_away.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})} - {item.arriving_time_away.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                    </p>
                    <p>
                      Return trip: {item.departing_time_home.toLocaleDateString()} {item.departing_time_home.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})} - {item.arriving_time_home.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </ul>
                
              </ListItemText>
            </ListItem>
          </List>
        </div>
      ))}
    </div>
  );
}

export default FlightsComponent;