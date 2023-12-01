import React, { useState, useEffect } from 'react';
import './Hotel.css';

function Hotel() {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [accommodationType, setAccommodationType] = useState<string | null>(() =>
    localStorage.getItem('AccommodationType') || null
  );
  const [city, setCity] = useState<string>(
    () => localStorage.getItem('city') || ''
  );
  const [fromDate, setFromDate] = useState<string>(() => localStorage.getItem('FROM_DATE') || '');
  const [toDate, setToDate] = useState<string>(() => localStorage.getItem('TO_DATE') || '');
  const [numAdults, setNumAdults] = useState<number>(
    () => parseInt(localStorage.getItem('adults') || '0', 10)
  );
  const [numKids, setNumKids] = useState<number>(
    () => parseInt(localStorage.getItem('kids') || '0', 10)
  );

  const handleBoxClick = (boxNumber: number, boxName: string) => {
    setSelectedBox(boxNumber === selectedBox ? null : boxNumber);
    setAccommodationType(boxNumber === selectedBox ? null : boxName);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = event.target.value;
    setCity(newCity);
    localStorage.setItem('city', newCity);
  };

  useEffect(() => {
    const storedCity = localStorage.getItem('city');
    const storedAccommodationType = localStorage.getItem('AccommodationType');
    const storedFromDate = localStorage.getItem('FROM_DATE');
    const storedToDate = localStorage.getItem('TO_DATE');
    const storedNumAdults = parseInt(localStorage.getItem('adults') || '0', 10);
    const storedNumKids = parseInt(localStorage.getItem('kids') || '0', 10);


    if (storedCity !== null) {
      setCity(storedCity);
    } 

    if (storedAccommodationType !== null) {
      setAccommodationType(storedAccommodationType);
    }

    if (storedFromDate !== null) {
      setFromDate(storedFromDate);
    }

    if (storedToDate !== null) {
      setToDate(storedToDate);
    }

    if (!isNaN(storedNumAdults)) {
      setNumAdults(storedNumAdults);
    }

    if (!isNaN(storedNumKids)) {
      setNumKids(storedNumKids);
    }
  }, []);

  useEffect(() => {
    if (selectedBox !== null && accommodationType !== null) {
      localStorage.setItem('AccommodationType', accommodationType);
    }
  }, [selectedBox, accommodationType]);

  return (
    <div className="wrapper">
      <div>
        <label>
          <div>
            From Date: {fromDate}, To Date: {toDate}, Adults: {numAdults}, Kids: {numKids}
          </div>
        </label>
      </div>
      <div style={{ padding: '10px' }}>
        <label>
          In which city are you staying?
          <input type="text" value={city} onChange={handleCityChange} />
        </label>
      </div>
      <div style={{ padding: '10px' }}>
        <label>
          Which type of accommodation are you going to be living in?
        </label>
        <div
          className={`box ${selectedBox === 1 ? 'selected' : ''}`}
          onClick={() => handleBoxClick(1, 'Hotel')}
        >
          Hotel
        </div>
        <div
          className={`box ${selectedBox === 2 ? 'selected' : ''}`}
          onClick={() => handleBoxClick(2, 'Apartment')}
        >
          Apartment
        </div>
        <div
          className={`box ${selectedBox === 3 ? 'selected' : ''}`}
          onClick={() => handleBoxClick(3, 'Hostel')}
        >
          Hostel
        </div>
        <div
          className={`box ${selectedBox === 4 ? 'selected' : ''}`}
          onClick={() => handleBoxClick(4, 'Nature')}
        >
          Nature
        </div>
      </div>
    </div>
  );
}

export default Hotel;