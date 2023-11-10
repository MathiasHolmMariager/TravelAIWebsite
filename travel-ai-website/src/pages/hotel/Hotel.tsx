
import './Hotel.css'
import { useState } from "react";

function Hotel() {
  const [stringValue] = useState(() => {
    const data = window.localStorage.getItem('STRING_VALUE_NAME');
    return data !== null ? data : '';
  });

  return (
    <div>
      <input type="text" defaultValue={stringValue} />
      
    </div>
  )


}

export default Hotel
