import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { OpenAItest } from '../../OpenAI';
import loading_animation from '../../assets/loading_animation.gif';
import { fullPrompt } from '../../TripPrompt/FullPrompt';
import './Oplevelser.css';

interface Message {
  role: 'User' | 'Assistant';
  content: string;
}

// ... (existing imports and interfaces)

export default function ReturnInput() {
  const [userInput, setUserInput] = React.useState<string>('');
  const [userOutput, setUserOutput] = React.useState<string>('');
  const [conversationHistory, setConversationHistory] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false); // For handleSubmit loading
  const [initialLoading, setInitialLoading] = React.useState<boolean>(true); // For useEffect loading

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput) {
      setIsLoading(true); // Set isLoading for handleSubmit loading
      try {
        const { assistantReply, conversationHistory: updatedHistory } = await OpenAItest(userInput, conversationHistory);
        setConversationHistory(updatedHistory);

        if (assistantReply !== null) {
          setUserOutput(assistantReply);
        } else {
          setUserOutput('No response');
        }
      } catch (error) {
        setUserOutput('Error occurred');
      }
      setIsLoading(false);
    }
  };

  /*React.useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true); // Set initialLoading to true before starting useEffect loading
      try {
        const { assistantReply, conversationHistory: updatedHistory } = await OpenAItest(fullPrompt);
        setConversationHistory(updatedHistory);

        if (assistantReply !== null) {
          setUserOutput(assistantReply);
        } else {
          setUserOutput('No response');
        }
      } catch (error) {
        setUserOutput('Error occurred');
      }
      setInitialLoading(false); // Set initialLoading to false after useEffect completes
    };

    fetchData();
  }, []); */

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      {initialLoading && ( // Check initialLoading for useEffect loading
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={loading_animation} alt="Loading..." width={'100px'} height={'100px'} />
          <p className='loading-text'>Loading things to do based on interests and city...</p>
        </Box>
      )}
      {!initialLoading && ( // Display conversation history and form once useEffect loading is complete
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
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
                InputProps={{ placeholder: 'Ask further questions here' }}
              />
              <Button type="submit" variant="contained" className="submit-button">
                Submit
              </Button>
            </form>
            {isLoading && <img src={loading_animation} alt="Loading..." width={'50px'} height={'50px'} />}
          </div>
        </Box>
      )}
    </Container>
  );
}