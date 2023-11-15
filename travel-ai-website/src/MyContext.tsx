// MyContext.tsx
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
}

interface MyProviderProps { children: ReactNode; }

interface MyContextData {
  sortedArray: Item[];
  updateSortedArray: (newArray: Item[]) => void;
}

// Create the context with an initial value
const MyContext = createContext<MyContextData | undefined>(undefined);

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [sortedArray, setSortedArray] = useState<Item[]>([]);

  const updateSortedArray = (newArray: Item[]) => {
    setSortedArray(newArray);
  };

  const contextValue: MyContextData = {
    sortedArray,
    updateSortedArray,
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