
import { useState } from "react";


function Persons() {
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

export default Persons
