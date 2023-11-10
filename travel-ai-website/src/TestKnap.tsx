import axios from "axios";
import { SERVER_PORT } from "./Constants";


function MyComponent() {

  const onClick = async () => {
    const result = (await axios.post(`${SERVER_PORT}/duffel`)).data.res;
    //const sortedArray = result.data.map((item: any)=>({base_amount: item.base_amount, base_currency: item.base_currency}));
    console.log(result); //skriv sortedArray i stedet for result
  }

  return (
    <div>
      <button onClick={onClick}>Click me to test</button>
    </div>
  );
}

export default MyComponent;