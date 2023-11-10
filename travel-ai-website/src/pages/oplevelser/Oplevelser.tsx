import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function ReturnInput() {
  const [userInput, setUserInput] = React.useState(''); // Initialize user input state with an empty string
  const [userOutput, setUserOutput] = React.useState(''); // Initialize user output state with an empty string

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value); // Update the user input state when the input changes
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserOutput(userInput); // Update the user output state when the form is submitted
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="UserInput"
            label="UserInput"
            name="UserInput"
            autoComplete="UserInput"
            autoFocus
            value={userInput}
            onChange={handleInputChange}
          />
          <Button type="submit" fullWidth variant="contained">
            Submit
          </Button>
        </form>

        <textarea id="UserOutput" readOnly value={userOutput}></textarea>
      </Box>
    </Container>
  );
}
