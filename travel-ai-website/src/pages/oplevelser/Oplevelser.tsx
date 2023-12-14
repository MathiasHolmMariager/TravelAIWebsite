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

interface Message {
  role: "User" | "Assistant";
  content: string;
}

export default function ReturnInput() {
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

          const originalContent = updatedHistory[1].content;
          const formattedString = originalContent.replace(/\d+[.]/g, '<br><br>$&');
          const additionalSentence = "Here are some things you can do based on your interest and location:";
          const updatedContent = `${additionalSentence}${formattedString}`;
          const updatedItem = { ...updatedHistory[1], content: updatedContent };

          const updatedHistoryCopy = [...updatedHistory];
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

  const [city] = useState(() => {
    const data = window.localStorage.getItem("city");
    return data !== null ? data : "";
  });

  const [local_flight_price] = useState(() => {
    const data = window.localStorage.getItem("FLIGHT_PRICE");
    return data !== null ? data : "";
  });

  const [local_hotel_price] = useState(() => {
    const data = window.localStorage.getItem("HOTEL_PRICE");
    return data !== null ? data : "";
  });

  const flight_price = parseFloat(local_flight_price);
  const hotel_price = parseFloat(local_hotel_price);
  const total_price = flight_price + hotel_price;

  const [travelfrom] = useState(() => {
    const data = window.localStorage.getItem("TRAVEL_FROM");
    return data !== null ? data : "";
  });

  const [travelto] = useState(() => {
    const data = window.localStorage.getItem("TRAVEL_TO");
    return data !== null ? data : "";
  });

  const [traveldate] = useState(() => {
    const data = window.localStorage.getItem("TRAVEL_DATE");
    return data !== null ? data : "";
  });

  const [traveltimedepart] = useState(() => {
    const data = window.localStorage.getItem("TRAVEL_DATE_TIME_DEPART");
    return data !== null ? data : "";
  });

  const [traveltimearrive] = useState(() => {
    const data = window.localStorage.getItem("TRAVEL_DATE_TIME_ARRIVE");
    return data !== null ? data : "";
  });

  const [returnfrom] = useState(() => {
    const data = window.localStorage.getItem("RETURN_FROM");
    return data !== null ? data : "";
  });

  const [returnto] = useState(() => {
    const data = window.localStorage.getItem("RETURN_TO");
    return data !== null ? data : "";
  });

  const [returndate] = useState(() => {
    const data = window.localStorage.getItem("RETURN_DATE");
    return data !== null ? data : "";
  });

  const [returntimedepart] = useState(() => {
    const data = window.localStorage.getItem("RETURN_DATE_TIME_DEPART");
    return data !== null ? data : "";
  });

  const [returntimearrive] = useState(() => {
    const data = window.localStorage.getItem("RETURN_DATE_TIME_ARRIVE");
    return data !== null ? data : "";
  });

  const [accommodation] = useState(() => {
    const data = window.localStorage.getItem("AccommodationType");
    return data !== null ? data : "";
  });

  const [accommodationName] = useState(() => {
    const data = window.localStorage.getItem("AccommodationName");
    return data !== null ? data : "";
  });

  const [adults] = useState(() => {
    const data = window.localStorage.getItem("adults");
    return data !== null ? data : "";
  });

  const [kids] = useState(() => {
    const data = window.localStorage.getItem("kids");
    return data !== null ? data : "";
  });

  const [interests] = useState(() => {
    const data = window.localStorage.getItem("generatedInterests");
    return data !== null ? data : "";
  });

  return (
    <div>
      <div className="overview">
        <p>
          <b>Your Trip Overview:</b>
        </p>
        <p>
          <b>City:</b> {city}
        </p>
        <p>
          <b>Total Price:</b> {total_price} EUR
        </p>
        <p>
          <b>Departure:</b> <br />
          {travelfrom} ⟶ {travelto}
          <br />
          {traveldate} 🕑 {traveltimedepart} - {traveltimearrive}
        </p>
        <p>
          <b>Return:</b> <br />
          {returnfrom} ⟶ {returnto}
          <br />
          {returndate} 🕑 {returntimedepart} - {returntimearrive}
        </p>
        <p>
          <b>Accommodation:</b><br />{accommodationName}{" ("}{accommodation}{")"}
        </p>
        <p>
          <b>Adults:</b> {adults}
        </p>
        <p>
          <b>Kids:</b> {kids}
        </p>
        <p>
          <b>Interests:</b> {interests}
        </p>
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
