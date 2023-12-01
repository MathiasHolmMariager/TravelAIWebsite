import React, { ReactNode, createContext, useContext, useState } from 'react';

interface Item {
  total_amount: string;
  total_currency: string;
  owner_name: string;
  owner_logo: string;
  departing_time_away: Date;
  arriving_time_away: Date;
  departing_time_home: Date;
  arriving_time_home: Date;
  airport_departing_away: string;
  airport_arriving_away: string;
  airport_departing_home: string;
  airport_arriving_home: string;
}

interface MyProviderProps {
  children: ReactNode;
}

const SAVED_FLIGHTS_KEY = "SAVED_FLIGHTS";

interface MyContextData {
  sortedArray: Item[];
  updateSortedArray: (newArray: Item[]) => void;
  buttonClicked: boolean;
  setButtonClicked: (clicked: boolean) => void;
  setAllFlightsAsNotSaved: () => void;
}

// Create the context with an initial value
const MyContext = createContext<MyContextData | undefined>(undefined);

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [sortedArray, setSortedArray] = useState<Item[]>([]);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [savedFlights, setSavedFlights] = useState<boolean[]>([]);

  const updateSortedArray = (newArray: Item[]) => {
    setSortedArray(newArray);
  };
  const setAllFlightsAsNotSaved = () => {
    const updatedSavedFlights = savedFlights.map(() => false);
    setSavedFlights(updatedSavedFlights);
    localStorage.setItem(SAVED_FLIGHTS_KEY, JSON.stringify(updatedSavedFlights));
  }

  

  const contextValue: MyContextData = {
    sortedArray,
    updateSortedArray,
    buttonClicked,
    setButtonClicked,
    setAllFlightsAsNotSaved,
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export const useMyContext = (): MyContextData => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  return context;
};