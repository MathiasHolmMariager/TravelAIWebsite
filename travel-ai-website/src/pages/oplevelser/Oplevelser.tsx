import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import loading_animation from "../../assets/loading_animation.gif";
import { OpenAItest } from "../../OpenAI";
import { getInterestString } from "../../TripPrompt/InterestsPrompt";
import { useEffect, useRef, useState } from "react";
import "./Oplevelser.css";
import { Style } from "@mui/icons-material";

interface Message {
  role: "User" | "Assistant";
  content: string;
}

export default function ReturnInput() {

  const [savedItems, setSavedItems] = useState([]);
  const [list, setList] = useState([]);

  const [userInput, setUserInput] = React.useState<string>("");
  const [userOutput, setUserOutput] = React.useState<string>("");
  const [conversationHistory, setConversationHistory] = React.useState<
    Message[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false); // For handleSubmit loading
  const [initialLoading, setInitialLoading] = React.useState<boolean>(true); // For useEffect loading

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  // Create a ref for the conversation history div
  const conversationHistoryRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll down to the last index
  const scrollToBottom = () => {
    if (conversationHistoryRef.current) {
      const lastMessage = conversationHistoryRef.current
        .lastChild as HTMLDivElement;
      lastMessage.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput) {
      setIsLoading(true); // Set isLoading for handleSubmit loading
      try {
        const { assistantReply, conversationHistory: updatedHistory } =
          await OpenAItest(userInput, conversationHistory);
        setConversationHistory(updatedHistory);

        if (assistantReply !== null) {
          setUserOutput(assistantReply);
        } else {
          setUserOutput("No response");
        }
      } catch (error) {
        setUserOutput("Error occurred");
      }
      setIsLoading(false);
      setUserInput("");
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);
      try {
        const interests = getInterestString();
        const adults = localStorage.getItem("adults");
        const kids = localStorage.getItem("kids");
        const city = localStorage.getItem("city");

        const fullPrompt = 
        `We are ${adults} adults and ${kids} kids going on a trip to ${city}. 
        ${interests} What are some things we could do in the city that fit our interests? 
        I want you to give me the things to do as a numbered list and please just only give me the list 
        with a small description for each thing to do. 
        Please refrain from adding any extra information, notes, or final statements. Thank you.`;

        const { assistantReply, conversationHistory: updatedHistory } =
          await OpenAItest(fullPrompt);

          const question = 
          `We are ${adults} adults and ${kids} kids going on a trip to ${city}. 
          ${interests} What are some things we could do in the city that fit our interests?`;

          const originalContent = updatedHistory[1].content;
          const formattedString = originalContent.replace(/\d+[.]/g, '<br><br>$&');
          const additionalSentence = "Here are some things you can do based on your interest and location:";
          const updatedContent = `${additionalSentence}${formattedString}`;
          const updatedItemQuest = { ...updatedHistory[0], content: question };
          const updatedItem = { ...updatedHistory[1], content: updatedContent };

          const updatedHistoryCopy = [...updatedHistory];
          updatedHistoryCopy[0] = updatedItemQuest;
          updatedHistoryCopy[1] = updatedItem;

        setConversationHistory(updatedHistoryCopy);

        const itemsArray = originalContent.split(/\d+\./).filter((item: string) => item.trim() !== '');
        localStorage.setItem("itemsArray", JSON.stringify(itemsArray));

        if (assistantReply !== null) {
          setUserOutput(assistantReply);
        } else {
          setUserOutput("No response");
        }
      } catch (error) {
        setUserOutput("Error occurred");
      }
      setInitialLoading(false);
      const storedList = JSON.parse(localStorage.getItem("itemsArray") ?? '[]');
      setList(storedList);

    };

    fetchData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  useEffect(() => {
    if (!isLoading) {
      scrollToBottom();
    }
  }, [isLoading]);

  
  useEffect(() => {
    // Retrieve data from local storage
    const storedList = JSON.parse(localStorage.getItem("itemsArray") ?? '[]');
    const storedSavedItems = JSON.parse(localStorage.getItem('savedItemsKey') ?? '[]');
    setList(storedList);
    setSavedItems(storedSavedItems);
  }, []);



  const handleButtonClick = (index: number) => {

    const clickedItem = list[index];
    // Check if the item is not already in the saved items list
    if (savedItems.includes(clickedItem)) {
      // Item is already saved, so remove it
      const updatedSavedItems = savedItems.filter(item => item !== clickedItem);
      setSavedItems(updatedSavedItems);
      localStorage.setItem('savedItemsKey', JSON.stringify(updatedSavedItems));
    } else {
      // Item is not saved, so add it
      const newSavedItems = [...savedItems, clickedItem];
      setSavedItems(newSavedItems);
      localStorage.setItem('savedItemsKey', JSON.stringify(newSavedItems));
    }
  };




  return (
    <div>
      <div className="overview">
        <p>
          <b>Save your favorite Experiences</b>
        </p>
          <ul className="overview-list">
            {list.map((item, index) => (
              <li  className="overview-item" key={index}>
              <div className="item-content">{item}</div>
              <Button               
                onClick={() => handleButtonClick(index)}
                color="primary"
                variant="contained"
                style={{
                  height: "50px",
                  width: "130px",
                  marginBottom: "14px",
                  backgroundColor: savedItems.includes(list[index]) ? 'white' : '#3f50b5',
                  color: savedItems.includes(list[index]) ? '#3f50b5' : 'white', 
                  border: savedItems.includes(list[index]) ? '3px solid #3f50b5' : '3px solid #3f50b5',
                  borderRadius: "8px"
                }}>
                  {savedItems.includes(list[index]) ? 'Unsave' : 'Save'}
              </Button>
              </li>
            ))}
          </ul>
      </div>

      <div className="gbtchat">
        <Container
          component="main"
          maxWidth="md"
          sx={{
            marginLeft: 80,
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              {initialLoading && (
                <div className="conversation-history-load">
                  <img
                    src={loading_animation}
                    alt="Loading..."
                    width={"100px"}
                    height={"100px"}
                  />
                  <p className="loading-text">
                    Loading things to do based on your interests and location...
                  </p>
                </div>
              )}
              {!initialLoading && (
                <div
                  className="conversation-history"
                  ref={conversationHistoryRef}
                >
                  {conversationHistory.map((message, index) => (
                    <div
                      key={index}
                      className={
                        index % 2 === 0 ? "user-message" : "assistant-message"
                      }
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    >
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="user-input-form">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="UserInput"
                  name="UserInput"
                  autoComplete="Off"
                  autoFocus
                  value={userInput}
                  onChange={handleInputChange}
                  className="user-input"
                  InputProps={{ placeholder: "Ask further questions here" }}
                />
                {!isLoading && (
                  <Button
                    type="submit"
                    variant="contained"
                    className="submit-button"
                    sx={{ marginTop: "6px", marginLeft: "10px" }}
                  >
                    Submit
                  </Button>
                )}
                {isLoading && (
                  <Button
                    type="submit"
                    variant="contained"
                    className="submit-button"
                    sx={{ marginTop: "6px", marginLeft: "10px" }}
                  >
                    <img
                      src={loading_animation}
                      alt="Loading..."
                      width={"50px"}
                      height={"50px"}
                    />
                  </Button>
                )}
              </form>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  );
}
