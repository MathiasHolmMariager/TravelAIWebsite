import { List, ListItem, ListItemText, Button } from "@mui/material";
import { useMyContext } from "./MyContext";
import "./FlightTickets.css";
import {  useState } from "react";


function FlightsComponent() {
  const { sortedArray, buttonClicked } = useMyContext();
  const [saveButtonStates, setSaveButtonStates] = useState<{ [key: string]: boolean }>({});

  const handleSaveButtonClick = (itemId: string) => {

    setSaveButtonStates(() => ({
      [itemId]: true,
    }));

    const selectedItem = sortedArray.find(item => item.id === itemId);

    if (selectedItem) {
      localStorage.setItem("FLIGHT_PRICE", selectedItem.total_amount);
    } else {
      console.error(`Item with id ${itemId} not found.`);
    }

    const dataCity = window.localStorage.getItem("city_ticket");
    if (dataCity !== null) {
      localStorage.setItem("city", dataCity);
    } else {
      console.error("localStorage item 'city_ticket' is null.");
    }

    const dataAdults = window.localStorage.getItem("adults_ticket");
    if (dataAdults !== null) {
      localStorage.setItem("adults", dataAdults);
    } else {
      console.error("localStorage item 'adults_ticket' is null.");
    }

    const dataKids = window.localStorage.getItem("kids_ticket");
    if (dataKids !== null) {
      localStorage.setItem("kids", dataKids);
    } else {
      console.error("localStorage item 'kids_ticket' is null.");
    }

    const dataTo = window.localStorage.getItem("to_ticket");
    if (dataTo !== null) {
      localStorage.setItem("STRING_VALUE_TO", dataTo);
    } else {
      console.error("localStorage item 'to_ticket' is null.");
    }

    const dataDateTo = window.localStorage.getItem("date_to_ticket");
    if (dataDateTo !== null) {
      localStorage.setItem("TO_DATE", dataDateTo);
    } else {
      console.error("localStorage item 'date_to_ticket' is null.");
    }

    const dataDateFrom = window.localStorage.getItem("date_from_ticket");
    if (dataDateFrom !== null) {
      localStorage.setItem("FROM_DATE", dataDateFrom);
    } else {
      console.error("localStorage item 'date_from_ticket' is null.");
    }
  };

  if (!buttonClicked) {
    return null; 
  }

  return (
    <div className="fixedBox">
      {sortedArray.map((item) => (
        <div
          key={item.id} // Assuming you have a unique identifier like "id" in your data
          className={`listContainer ${
            item === sortedArray[sortedArray.length - 1] ? "lastItem" : ""
          }`}
        >
          <List>
            <ListItem>
              <ListItemText>
                <ul>
                  <p className="price">
                    Total price:
                    <br />
                    {item.total_amount} {item.total_currency}
                  </p>
                  <div className="flightfirm">
                    <img
                      className="imgCSS"
                      src={item.owner_logo}
                      alt="Owner Logo"
                    />
                    <p className="owner">{item.owner_name}</p>
                  </div>

                  <p>
                    Travel date: {item.departing_time_away.toLocaleDateString()}{" "}
                    🕑{" "}
                    {item.departing_time_away.toLocaleTimeString(
                      navigator.language,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}{" "}
                    -{" "}
                    {item.arriving_time_away.toLocaleTimeString(
                      navigator.language,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                  <p>
                    {item.airport_departing_away} ⟶ {item.airport_arriving_away}
                  </p>
                  <p className="space">
                    Return date: {item.departing_time_home.toLocaleDateString()}{" "}
                    🕑{" "}
                    {item.departing_time_home.toLocaleTimeString(
                      navigator.language,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}{" "}
                    -{" "}
                    {item.arriving_time_home.toLocaleTimeString(
                      navigator.language,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                  <p>
                    {item.airport_departing_home} ⟶ {item.airport_arriving_home}
                  </p>
                  <p className="save">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSaveButtonClick(item.id)}
                      disabled={saveButtonStates[item.id]} 
                    >
                      {saveButtonStates[item.id] ? "Saved" : "Save flight"}
                    </Button>
                  </p>
                </ul>
              </ListItemText>
            </ListItem>
          </List>
        </div>
      ))}
    </div>
  );
}

export default FlightsComponent;
