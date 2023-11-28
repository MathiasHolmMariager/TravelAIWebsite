import React, { useState, useEffect } from 'react';
import './Hotel.css';

function Hotel() {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [AccommodationType, setAccommodationType] = useState<string | null>(() =>
    localStorage.getItem('AccommodationType') || null
  );
  const [city, setCity] = useState<string>(() => localStorage.getItem('city') || '');

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

    if (storedCity !== null) {
      setCity(storedCity);
    }

    if (storedAccommodationType !== null) {
      setAccommodationType(storedAccommodationType);
    }
  }, []);

  useEffect(() => {
    if (selectedBox !== null && AccommodationType !== null) {
      localStorage.setItem('AccommodationType', AccommodationType);
    }
  }, [selectedBox, AccommodationType]);

  return (
    <div className="wrapper">
      <div>
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
      <div>
        <label>
          In which city are you staying?
          <input type="text" value={city} onChange={handleCityChange} />
        </label>
      </div>
    </div>
  );
}

export default Hotel;
