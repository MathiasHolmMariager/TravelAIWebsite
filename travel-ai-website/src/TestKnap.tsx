import axios from "axios";
import { SERVER_PORT } from "./Constants";


function MyComponent() {

  const onClick = async () => {
    const result = (await axios.post(`${SERVER_PORT}/duffel`)).data.res;

    const sortedArray = result.data.map((item: any)=>({
      total_amount: item.total_amount, 
      total_currency: item.total_currency, 
      owner_name: item.owner.name, 
      owner_logo: item.owner.logo_symbol_url, 
      departing_time_away: item.slices[0].segments[0].departing_at, 
      arriving_time_away: item.slices[0].segments[0].arriving_at,
      departing_time_home: item.slices[1].segments[0].departing_at, 
      arriving_time_home: item.slices[1].segments[0].arriving_at,
    }));

    console.log(sortedArray);
  }

  return (
    <div>
      <button onClick={onClick}>Click me to test</button>
    </div>
  );
}

export default MyComponent;