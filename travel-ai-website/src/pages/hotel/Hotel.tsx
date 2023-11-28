import React, { useState, useEffect } from 'react';
import './Hotel.css';

function Hotel() {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [AccommodationType, setAccommodationType] = useState<string | null>(() =>
    localStorage.getItem('AccommodationType') || null
  );
  const [city, setCity] = useState<string>(() => localStorage.getItem('city') || '');
  const [country, setCountry] = useState<string>(() => localStorage.getItem('country') || '');

  const handleBoxClick = (boxNumber: number, boxName: string) => {
    setSelectedBox(boxNumber === selectedBox ? null : boxNumber);
    setAccommodationType(boxNumber === selectedBox ? null : boxName);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = event.target.value;
    setCity(newCity);
    localStorage.setItem('city', newCity);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCountry = event.target.value;
    setCountry(newCountry);
    localStorage.setItem('country', newCountry);
  };

  // useEffect to update state from local storage on mount
  useEffect(() => {
    const storedCity = localStorage.getItem('city');
    const storedCountry = localStorage.getItem('country');
    const storedAccommodationType = localStorage.getItem('AccommodationType');

    if (storedCity !== null) {
      setCity(storedCity);
    }

    if (storedCountry !== null) {
      setCountry(storedCountry);
    }

    if (storedAccommodationType !== null) {
      setAccommodationType(storedAccommodationType);
    }
  }, []);

  // useEffect to save selected box name to local storage when it changes
  useEffect(() => {
    if (selectedBox !== null && AccommodationType !== null) {
      localStorage.setItem('AccommodationType', AccommodationType);
    }
  }, [selectedBox, AccommodationType]);

  return (
    <div>
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
          Country:
          <input type="text" value={country} onChange={handleCountryChange} />
        </label>
      </div>
      <div>
        <label>
          City:
          <input type="text" value={city} onChange={handleCityChange} />
        </label>
      </div>
    </div>
  );
}

export default Hotel;