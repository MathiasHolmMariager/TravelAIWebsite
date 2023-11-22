import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const NumberInput: React.FC = () => {
  // Load values from local storage on component mount
  const savedAdults = localStorage.getItem('adults');
  const savedKids = localStorage.getItem('kids');

  const [adults, setAdults] = React.useState<number>(
    savedAdults ? Number(savedAdults) : 0
  );

  const [kids, setKids] = React.useState<number>(
    savedKids ? Number(savedKids) : 0
  );

  const handleAdultsIncrement = () => {
    setAdults(adults + 1);
  };

  const handleAdultsDecrement = () => {
    setAdults(Math.max(adults - 1, 0));
  };

  const handleKidsIncrement = () => {
    setKids(kids + 1);
  };

  const handleKidsDecrement = () => {
    setKids(Math.max(kids - 1, 0));
  };

  // Save values to local storage whenever adults or kids change
  useEffect(() => {
    localStorage.setItem('adults', String(adults));
  }, [adults]);

  useEffect(() => {
    localStorage.setItem('kids', String(kids));
  }, [kids]);

  return (
    <Box display="flex" flexDirection="row">
      <Box display="flex" alignItems="center">
      <Button variant="outlined" onClick={handleAdultsDecrement}>
          -
        </Button>
        
        <TextField
          margin="normal"
          label="Adults"
          id="adults-input"
          type="number"
          value={adults}
          onChange={(e) => setAdults(Math.max(parseInt(e.target.value) || 0, 0))}
        />
        <Button variant="outlined" onClick={handleAdultsIncrement}>
          +
        </Button>
      </Box>

      <Box display="flex" alignItems="center">
        <Button variant="outlined" onClick={handleKidsDecrement}>
          -
        </Button>
        <TextField
          margin="normal"
          label="Kids"
          id="kids-input"
          type="number"
          value={kids}
          onChange={(e) => setKids(Math.max(parseInt(e.target.value) || 0, 0))}
        />
        <Button variant="outlined" onClick={handleKidsIncrement}>
          +
        </Button>
      </Box>
    </Box>
  );
};

export default NumberInput;
