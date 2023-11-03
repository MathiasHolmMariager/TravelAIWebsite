import axios from "axios";
import { SERVER_PORT } from "./Constants";


function MyComponent() {

  const onClick = async () => {
    const res = await axios.post(`${SERVER_PORT}/duffel`);
    console.log(res);
    
  }

  return (
    <div>
      <button onClick={onClick}>Click me to test</button>
    </div>
  );
}

export default MyComponent;