
import { List, ListItem, ListItemText } from '@mui/material';
import { useMyContext } from './MyContext';

function FlightsComponent() {
  const { sortedArray } = useMyContext();

  return (
    <div>
      <h2>Another Component</h2>
      <List>
        {sortedArray.map((item, index) => (
          <ListItem key={index}>
            <ListItemText>
              <ul>
                <li>Total Amount: {item.total_amount}</li>
                <li>Total Currency: {item.total_currency}</li>
                <li>Owner Name: {item.owner_name}</li>
                <li>Owner Logo: {item.owner_logo}</li>
                <li>
                  Departing Date Away: {item.departing_time_away.toLocaleDateString()}
                </li>
                <li>
                  Departing Time Away: {item.departing_time_away.toLocaleTimeString()}
                </li>
                <li>
                  Arriving Date Away: {item.arriving_time_away.toLocaleDateString()}
                </li>
                <li>
                  Arriving Time Away: {item.arriving_time_away.toLocaleTimeString()}
                </li>
                <li>
                  Departing Date Home: {item.departing_time_home.toLocaleDateString()}
                </li>
                <li>
                  Departing Time Home: {item.departing_time_home.toLocaleTimeString()}
                </li>
                <li>
                  Arriving Date Home: {item.arriving_time_home.toLocaleDateString()}
                </li>
                <li>
                  Arriving Time Home: {item.arriving_time_home.toLocaleTimeString()}
                </li>
              </ul>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default FlightsComponent;


