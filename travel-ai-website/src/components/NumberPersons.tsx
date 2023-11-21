import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
    <Box>
      <Typography id="adults-label" gutterBottom>
        Adults: {adults}
      </Typography>
      <Button variant="outlined" onClick={handleAdultsIncrement}>
        +
      </Button>
      <Button variant="outlined" onClick={handleAdultsDecrement}>
        -
      </Button>

      <Typography id="kids-label" gutterBottom>
        Kids: {kids}
      </Typography>
      <Button variant="outlined" onClick={handleKidsIncrement}>
        +
      </Button>
      <Button variant="outlined" onClick={handleKidsDecrement}>
        -
      </Button>
    </Box>
  );
};

export default NumberInput;
