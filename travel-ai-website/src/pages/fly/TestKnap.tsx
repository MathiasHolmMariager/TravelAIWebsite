import { useMyContext } from './MyContext';
import axios from 'axios';
import { SERVER_PORT } from '../../Constants';
import loading_animation from '../../assets/loading_animation.gif';
import { useState } from 'react';

function MyComponent() {
  const { updateSortedArray, setButtonClicked, buttonClicked } = useMyContext();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const fromDate = localStorage.getItem('FROM_DATE');
      const toDate = localStorage.getItem('TO_DATE');
      const stringValueFrom = localStorage.getItem('STRING_VALUE_FROM');
      const stringValueTo = localStorage.getItem('STRING_VALUE_TO');
      const adults = localStorage.getItem('adults');
      const kids = localStorage.getItem('kids');

      const passengers = [];
      for (let i = 0; i < parseInt(adults || '0'); i++) {
        passengers.push({ type: 'adult' });
      }
      for (let i = 0; i < parseInt(kids || '0'); i++) {
        passengers.push({ type: 'child' });
      }

      const params = {
        slices: [
          {
            origin: stringValueFrom,
            destination: stringValueTo,
            departure_date: fromDate,
          },
          {
            origin: stringValueTo,
            destination: stringValueFrom,
            departure_date: toDate,
          },
        ],
        passengers: passengers,
        cabin_class: 'economy',
      };

      const result = (await axios.post(`${SERVER_PORT}/duffel`, params)).data.res;
      console.log(result);

      const sortedArray = result.data.map((item: any) => ({
        total_amount: item.total_amount,
        total_currency: item.total_currency,
        owner_name: item.owner.name,
        owner_logo: item.owner.logo_symbol_url,
        departing_time_away: new Date(item.slices[0].segments[0].departing_at),
        arriving_time_away: new Date(item.slices[0].segments[0].arriving_at),
        departing_time_home: new Date(item.slices[1].segments[0].departing_at),
        arriving_time_home: new Date(item.slices[1].segments[0].arriving_at),
        airport_departing_away: item.slices[0].origin.name,
        airport_arriving_away: item.slices[0].destination.name,
        airport_departing_home: item.slices[1].origin.name,
        airport_arriving_home: item.slices[1].destination.name,
      }));

      updateSortedArray(sortedArray);
      setButtonClicked(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!buttonClicked && !isLoading && (
        <button onClick={onClick}>Search</button>
      )}
      {isLoading && <img src={loading_animation} alt="Loading..." />}
    </div>
  );
}

export default MyComponent;