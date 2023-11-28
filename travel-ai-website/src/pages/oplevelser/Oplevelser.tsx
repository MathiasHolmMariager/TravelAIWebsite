import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { OpenAItest } from '../../OpenAI';
import './Oplevelser.css';

interface Message {
  role: 'User' | 'Assistant';
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

      if (assistantReply !== null) {
        setUserOutput(assistantReply);
      } else {
      }
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className="chat-container">
          <div className="conversation-history">
            {conversationHistory.map((message, index) => (
              <div
                key={index}
                className={index % 2 === 0 ? 'user-message' : 'assistant-message'}
              >
                {message.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="user-input-form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="UserInput"
              name="UserInput"
              autoComplete="UserInput"
              autoFocus
              value={userInput}
              onChange={handleInputChange}
              className="user-input"
              InputProps={{placeholder: 'Ask further questions here'}}
            />
            <Button type="submit" variant="contained" className="submit-button">
              Submit
            </Button>
          </form>
        </div>
      </Box>
    </Container>
  );
}
