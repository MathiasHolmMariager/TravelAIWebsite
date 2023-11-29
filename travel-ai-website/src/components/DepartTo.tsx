import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { airportDataEU } from "./AirportEU";

const DepartToInput = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<
    {
      city: any;
      code: string;
      name: string;
      country: any;
    }[]
  >([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
    
      if (newValue === "") {
        localStorage.setItem("STRING_VALUE_FROM", "");
        setSuggestions([]);
        return;
      }
    
      const uppercasedValue = newValue.toUpperCase(); 
    
      const isValidAirportCode = /^[A-Z]{1,3}$/.test(uppercasedValue);
    
      if (isValidAirportCode || uppercasedValue.length >= 3) {
        const matchingAirports: {
          code: string;
          name: string;
          city: string;
          country: string;
        }[] = airportDataEU.filter(
          (airport: {
            code: string;
            name: string;
            city: string;
            country: string;
          }) =>
            airport.code.toUpperCase().startsWith(uppercasedValue) ||
            airport.name.toUpperCase().startsWith(uppercasedValue) ||
            airport.city.toUpperCase().startsWith(uppercasedValue) ||
            airport.country.toUpperCase().startsWith(uppercasedValue)
        );
    
        setSuggestions(matchingAirports);
        setSelectedSuggestionIndex(-1);
      } else {
        setSuggestions([]);
      }
    };

  const handleSuggestionClick = (code: string, city: string) => {
    setInputValue(`${code}, ${city}`);
    setSuggestions([]);
    localStorage.setItem("STRING_VALUE_TO", code);
    
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "Enter" && selectedSuggestionIndex !== -1) {
      e.preventDefault();
      const selectedSuggestion = suggestions[selectedSuggestionIndex];
      handleSuggestionClick(selectedSuggestion.code, selectedSuggestion.city);
    }
  };

  useEffect(() => {

    const storedValue = localStorage.getItem("STRING_VALUE_TO");
    if (storedValue) {
      const matchingAirport = airportDataEU.find(
        (airport) => airport.code === storedValue
      );

      if (matchingAirport) {
        setInputValue(`${matchingAirport.code}, ${matchingAirport.city}`);
      }
    }


    const handleDocumentMouseDown = (e: MouseEvent) => {
      if (
        (containerRef.current && containerRef.current.contains(e.target as Node)) ||
        (suggestionsRef.current && suggestionsRef.current.contains(e.target as Node))
      ) {
        return;
      }

      if (suggestions.length > 0) {
        const firstSuggestion = suggestions[0];
        handleSuggestionClick(firstSuggestion.code, firstSuggestion.city);
      }
    };

    document.addEventListener("mousedown", handleDocumentMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, [suggestions]);
  
  const handleTextFieldClick = () => {
    setInputValue('');
    localStorage.setItem('STRING_VALUE_TO', "");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative", 
        }}
      >
        <TextField
          margin="normal"
          id="Depart To"
          name="Depart to"
          label="Depart to"
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={handleTextFieldClick}
          style={{ marginLeft: '10px', marginRight: '-15px', width: '150px'}}
        />
        {suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            style={{
              position: "absolute",
              top: "90%", 
              left: 0,
              zIndex: 1, 
              width: "280px", 
              backgroundColor: "white", 
              borderRadius: "5px 5px 5px 5px", 
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", 
              maxHeight: "500px", 
              overflowY: "auto",
              marginLeft: "10px",
              
            }}
          >
            <List>
              {suggestions.map((airport, index) => (
                <ListItem
                  key={airport.code}
                  button
                  onClick={() => handleSuggestionClick(airport.code, airport.city)}
                  selected={index === selectedSuggestionIndex}
                >
                  <ListItemText
                    primary={`${airport.code} - ${airport.name} (${airport.city}, ${airport.country})`}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </Box>
    </Container>
  );
};


export default DepartToInput;