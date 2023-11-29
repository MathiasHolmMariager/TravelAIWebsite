import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const NumberInput: React.FC = () => {
  // Load values from local storage on component mount
  const savedAdults = localStorage.getItem('adults');
  const savedKids = localStorage.getItem('kids');

  const [adults, setAdults] = React.useState<number>(
    savedAdults ? Number(savedAdults) : 1
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

  useEffect(() => {
    localStorage.setItem('adults', String(adults));
    localStorage.setItem('kids', String(kids));
  }, [adults, kids]);

  const totalMax = adults + kids;
  const shouldHideButtonsMax = totalMax >= 9;

  const totalMin = adults + kids;
  const shouldHideButtonsMinAdults = totalMin <= 1 ||  adults === 0;
  const shouldHideButtonsMinKids = totalMin <= 1 || kids === 0;

  return (
    <Box display="flex" flexDirection="row" alignItems="baseline">
      <Box display="flex" alignItems="center">
        <Button
          variant="outlined"
          onClick={handleAdultsDecrement}
          disabled={shouldHideButtonsMinAdults}
          style={{ height: '56px', marginTop: '8px', fontSize: '1.5rem' , marginLeft: '10px'}}
        >
          
          -
        </Button>
  
        <TextField
          margin="normal"
          label="Adults"
          id="adults-input"
          value={adults}
          onChange={(e) => setAdults(Math.max(parseInt(e.target.value) || 0, 0))}
          InputProps={{ readOnly: true }}
          style={{ width: '80px', textAlign: 'center' }}
        />
  
        <Button
          variant="outlined"
          onClick={handleAdultsIncrement}
          disabled={shouldHideButtonsMax}
          style={{ height: '56px', marginTop: '8px', fontSize: '1.5rem', marginRight: '10px' }}
        >
          +
        </Button>
      </Box>
  
      <Box display="flex" alignItems="center">
        <Button
          variant="outlined"
          onClick={handleKidsDecrement}
          disabled={shouldHideButtonsMinKids}
          style={{ height: '56px', marginTop: '8px', fontSize: '1.5rem', marginLeft: '10px' }}
        >
          -
        </Button>
  
        <TextField
          margin="normal"
          label="Kids"
          id="kids-input"
          value={kids}
          onChange={(e) => setKids(Math.max(parseInt(e.target.value) || 0, 0))}
          InputProps={{ readOnly: true }}
          style={{ width: '80px', textAlign: 'center' }}
        />
  
        <Button
          variant="outlined"
          onClick={handleKidsIncrement}
          disabled={shouldHideButtonsMax}
          style={{ height: '56px', marginTop: '8px', fontSize: '1.5rem', marginRight: '10px'}}
        >
          +
        </Button>
      </Box>
    </Box>
  );
}  

export default NumberInput;