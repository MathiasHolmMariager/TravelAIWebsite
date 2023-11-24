import { List, ListItem, ListItemText, Button } from '@mui/material';
import { useMyContext } from './MyContext';
import './FlightTickets.css';

function FlightsComponent() {
  const { sortedArray, buttonClicked } = useMyContext();

    const handleSaveButtonClick = (price: string) => {
    // Save the price to local storage
    localStorage.setItem('FLIGHT_PRICE', price);
  };

  if (!buttonClicked) {
    return null; // Render nothing if the button hasn't been clicked yet
  }

  return (
    <div className='fixedBox'>
      {sortedArray.map((item, index) => (
        <div key={index} className='listContainer'>
          <List>
            <ListItem>
              <ListItemText>
                <ul>
                  <p className='price'>
                    Total price:<br />
                    {item.total_amount} {item.total_currency}
                  </p>
                  <p>{item.owner_name}</p>
                  <img className='imgCSS' src={item.owner_logo} alt="Owner Logo" />
                  <p>
                    Trip to destination: {item.departing_time_away.toLocaleDateString()}{' '}
                    {item.departing_time_away.toLocaleTimeString(navigator.language, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    - {item.arriving_time_away.toLocaleTimeString(navigator.language, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p>
                    {item.airport_departing_away} - {item.airport_arriving_away}
                  </p>
                  <p>
                    Return trip: {item.departing_time_home.toLocaleDateString()}{' '}
                    {item.departing_time_home.toLocaleTimeString(navigator.language, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    - {item.arriving_time_home.toLocaleTimeString(navigator.language, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p>
                    {item.airport_departing_home} - {item.airport_arriving_home}
                  </p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveButtonClick(item.total_amount)}
                  >
                    Save flight
                  </Button>
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
