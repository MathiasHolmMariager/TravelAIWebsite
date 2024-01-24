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
    
    //takes information from ticket and saves to localstorage
    if (selectedItem) {
      //price
      localStorage.setItem("FLIGHT_PRICE", selectedItem.total_amount);
      //from
      localStorage.setItem("TRAVEL_FROM", selectedItem.airport_departing_away);
      localStorage.setItem("TRAVEL_TO", selectedItem.airport_arriving_away);
      localStorage.setItem("TRAVEL_DATE", selectedItem.departing_time_away.toLocaleDateString(
        'en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}
      ));
      localStorage.setItem("TRAVEL_DATE_TIME_DEPART", selectedItem.departing_time_away.toLocaleTimeString(
        navigator.language,
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ));
      localStorage.setItem("TRAVEL_DATE_TIME_ARRIVE", selectedItem.arriving_time_away.toLocaleTimeString(
        navigator.language,
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ));
      //to
      localStorage.setItem("RETURN_FROM", selectedItem.airport_departing_home);
      localStorage.setItem("RETURN_TO", selectedItem.airport_arriving_home);
      localStorage.setItem("RETURN_DATE", selectedItem.departing_time_home.toLocaleDateString(
        'en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}
      ));
      localStorage.setItem("RETURN_DATE_TIME_DEPART", selectedItem.departing_time_home.toLocaleTimeString(
        navigator.language,
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ));
      localStorage.setItem("RETURN_DATE_TIME_ARRIVE", selectedItem.arriving_time_home.toLocaleTimeString(
        navigator.language,
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ));
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
                    Travel date: {item.departing_time_away.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}{" "}
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
                    Return date: {item.departing_time_home.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}{" "}
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
                      style={{
                        height: "50px",
                        width: "130px",
                      }}
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
