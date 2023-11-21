import React from 'react';
import axios from 'axios';
import { SERVER_PORT } from '../../Constants';

function HotelButton() {
    const onClick = async () => {
      try {
        const result = (await axios.post(`${SERVER_PORT}/duffelStays`)).data.res;
        console.log(result);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    return (
      <div>
        <button onClick={onClick}>Click me to test</button>
      </div>
    );
  }
  
  export default HotelButton;