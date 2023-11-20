
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";

function InputTest() {
    const [stringValueFrom, setStringValueFrom] = useState(() => {
        const data = window.localStorage.getItem("STRING_VALUE_FROM");
        return data !== null ? data : "";
      });
    
      const handleInputChangeFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setStringValueFrom(() => {
          window.localStorage.setItem("STRING_VALUE_FROM", newValue);
          return newValue;
        });
      };

      const [stringValueTo, setStringValueTo] = useState(() => {
        const data = window.localStorage.getItem("STRING_VALUE_TO");
        return data !== null ? data : "";
      });
    
      const handleInputChangeTo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setStringValueTo(() => {
          window.localStorage.setItem("STRING_VALUE_TO", newValue);
          return newValue;
        });
      };

    
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="Depart from"
          label="Depart from"
          name="Depart from"
          autoComplete="Depart from"
          autoFocus
          value={stringValueFrom}
          onChange={handleInputChangeFrom}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="Depart to"
          label="Depart to"
          name="Depart to"
          autoComplete="Depart to"
          autoFocus
          value={stringValueTo}
          onChange={handleInputChangeTo}
        />
              
      </Box>
      
    </Container>
  );
}

export default InputTest