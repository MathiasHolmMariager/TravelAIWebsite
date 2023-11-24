import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { OpenAItest } from '../../OpenAI';

interface Message {
  role: string;
  content: string;
}

export default function ReturnInput() {
  const [userInput, setUserInput] = React.useState<string>('');
  const [userOutput, setUserOutput] = React.useState<string>('');
  const [conversationHistory, setConversationHistory] = React.useState<Message[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput) {
      const { assistantReply, conversationHistory: updatedHistory } = await OpenAItest(userInput, conversationHistory);
      setConversationHistory(updatedHistory);
  
      // Check if the response is not null before setting the state
      if (assistantReply !== null) {
        setUserOutput(assistantReply);
      } else {
        // Handle the case when the response is null
        // You can set a default value or perform other actions as needed
      }
    }
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

        <textarea
          readOnly
          id="UserOutput"
          value={userOutput}
          style={{ resize: 'none', height: '250px', width: '100%', marginTop: '10px' }}
        />
      </Box>
    </Container>
  );
}
