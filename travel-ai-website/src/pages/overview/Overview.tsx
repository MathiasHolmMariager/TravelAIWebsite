import './Overview.css'
import { useState } from "react";

function Overview() {
  const [stringValue0] = useState(() => {
    const data = window.localStorage.getItem('TO_DATE');
    return data !== null ? data : '';
  });
  const [stringValue1] = useState(() => {
    const data = window.localStorage.getItem('FROM_DATE');
    return data !== null ? data : '';
  });
  const [stringValue2] = useState(() => {
    const data = window.localStorage.getItem('FLIGHT_PRICE');
    return data !== null ? data : '';
  });
  const [stringValue4] = useState(() => {
    const data = window.localStorage.getItem('ADULTS');
    return data !== null ? data : '';
  });
  const [stringValue3] = useState(() => {
    const data = window.localStorage.getItem('KIDS');
    return data !== null ? data : '';
  });
  const [stringValue5] = useState(() => {
    const data = window.localStorage.getItem('AccommodationType');
    return data !== null ? data : '';
  });
  return (
    <div className='OverviewPage'>
      <div className='dateTo'>
        Date to:
        <input type="text" defaultValue={stringValue0} />
      </div>
      <div className='dateFrom'>
        Date from:
        <input type="text" defaultValue={stringValue1} />
      </div>
      <div className='flightPrice'>
        Flight price:
        <input type="text" defaultValue={stringValue2} />
      </div>
      <div className='kids'>
        Adults:
        <input type="text" defaultValue={stringValue3} />
      </div>
      <div className='adults'>
        Kids:
        <input type="text" defaultValue={stringValue4} />
      </div>
      <div className='accom'>
        Accommodation type:
        <input type="text" defaultValue={stringValue5} />
      </div>
    </div>
  )
}
export default Overview
