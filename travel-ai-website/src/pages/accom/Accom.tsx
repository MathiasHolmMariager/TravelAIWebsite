// Accom.tsx
import { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  Box,
  SelectChangeEvent,
  TextField,
  InputLabel,
  Button,
} from "@mui/material";
import "./Accom.css";
import loading_animation from "../../assets/loading_animation.gif";
import InputAdornment from "@mui/material/InputAdornment";
import EventIcon from "@mui/icons-material/Event";
import hotelbillede from "../../assets/hotel-billede.jpg";
import hotelbilledeto from "../../assets/hotel-billede_2.jpg";
import hotelbilledetre from "../../assets/hotel-billede_3.jpg";
import hotelbilledefire from "../../assets/hotel-billede_4.jpg";
import hotelbilledefem from "../../assets/hotel-billede_5.jpg";
import hotelbilledeseks from "../../assets/hotel-billede_6.jpg";
interface Accommodation {
  name: string;
  description: string;
  price: string;
  id: string;
  img: string;
  rating: string;
}

interface Lists {
  [key: string]: Accommodation[];
}

function Accom() {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localStorage_adult, setLocalStorage_adult] = useState("");
  const [localStorage_kids, setLocalStorage_kids] = useState("");
  const [localStorage_from, setLocalStorage_from] = useState("");
  const [localStorage_to, setLocalStorage_to] = useState("");
  const [localStorage_city, setLocalStorage_city] = useState("");

  useEffect(() => {
    const stored_city = localStorage.getItem("city");
    if (stored_city) {
      setLocalStorage_city(stored_city);
    }

    const stored_adult = localStorage.getItem("adults");
    if (stored_adult) {
      setLocalStorage_adult(stored_adult);
    }

    const stored_kids = localStorage.getItem("kids");
    if (stored_kids) {
      setLocalStorage_kids(stored_kids);
    }

    const stored_from = localStorage.getItem("TRAVEL_DATE");
    if (stored_from) {
      const modifiedDatefrom = stored_from.replace(/\./g, "/");
      setLocalStorage_from(modifiedDatefrom);
    }

    const stored_to = localStorage.getItem("RETURN_DATE");
    if (stored_to) {
      const modifiedDateto = stored_to.replace(/\./g, "/");
      setLocalStorage_to(modifiedDateto);
    }
  }, []);

  const lists: Lists = {
    option1: [
      {
        name: "Velvet Horizon Inn",
        description: "Luxurious accommodations with various amenities.",
        price: "421,95",
        id: "1",
        img: hotelbillede,
        rating: "8.4 Rating"
      },
      {
        name: "Tranquil Haven Suites",
        description: "Luxurious accommodations with various amenities.",
        price: "398,50",
        id: "2",
        img: hotelbilledeto,
        rating: "7.3 Rating"
      },
      {
        name: "Celestial Oasis Hotel",
        description: "Luxurious accommodations with various amenities.",
        price: "563,95",
        id: "3",
        img: hotelbilledetre,
        rating: "7.8 Rating"
      },
      {
        name: "Sapphire Skies Lodge",
        description: "Luxurious accommodations with various amenities.",
        price: "346,95",
        id: "4",
        img: hotelbilledefire,
        rating: "8.9 Rating"
      },
      {
        name: "Whispering Pines Retreat",
        description: "Luxurious accommodations with various amenities.",
        price: "613,95",
        id: "5",
        img: hotelbilledefem,
        rating: "9.2 Rating"
      },
      {
        name: "Mystic Meadows Inn",
        description: "Luxurious accommodations with various amenities.",
        price: "472,95",
        id: "6",
        img: hotelbilledeseks,
        rating: "8.7 Rating"
      },
    ],
    option2: [
      {
        name: "Urban Nomad Hostel",
        description: "Budget-friendly accommodations with shared facilities.",
        price: "164,95",
        id: "7",
        img: hotelbilledeseks,
        rating: "5.4 Rating"
      },
      {
        name: "Backpacker's Den",
        description: "Budget-friendly accommodations with shared facilities.",
        price: "103,95",
        id: "8",
        img: hotelbilledefem,
        rating: "6.4 Rating"
      },
      {
        name: "Bohemian Bunkhouse",
        description: "Budget-friendly accommodations with shared facilities.",
        price: "124,95",
        id: "9",
        img: hotelbilledefire,
        rating: "8.3 Rating"
      },
      {
        name: "Wanderlust Haven Hostel",
        description: "Budget-friendly accommodations with shared facilities.",
        price: "153,95",
        id: "10",
        img: hotelbilledetre,
        rating: "8.4 Rating"
      },
      {
        name: "Nomad's Nook",
        description: "Budget-friendly accommodations with shared facilities.",
        price: "157,95",
        id: "11",
        img: hotelbilledeto,
        rating: "7.3 Rating"
      },
      {
        name: "Budget Explorer Inn",
        description: "Budget-friendly accommodations with shared facilities.",
        price: "73,95",
        id: "12",
        img: hotelbillede,
        rating: "5.4 Rating"
      },
    ],
    option3: [
      {
        name: "Cityscape Residences",
        description: "Rent a cozy apartment for a homely feel.",
        price: "654,95",
        id: "13",
        img: hotelbilledetre,
        rating: "9.2 Rating"
      },
      {
        name: "Metro Haven Apartments",
        description: "Rent a cozy apartment for a homely feel.",
        price: "573,95",
        id: "14",
        img: hotelbilledefire,
        rating: "7.8 Rating"
      },
      {
        name: "Serenity Springs Suites",
        description: "Rent a cozy apartment for a homely feel.",
        price: "478,95",
        id: "15",
        img: hotelbilledefem,
        rating: "7.9 Rating"
      },
      {
        name: "Cosmopolitan Lofts",
        description: "Rent a cozy apartment for a homely feel.",
        price: "394,95",
        id: "16",
        img: hotelbilledeseks,
        rating: "6.6 Rating"
      },
      {
        name: "Vista View Residences",
        description: "Rent a cozy apartment for a homely feel.",
        price: "412,95",
        id: "17",
        img: hotelbillede,
        rating: "7.2 Rating"
      },
      {
        name: "Harmony Heights Apartments",
        description: "Rent a cozy apartment for a homely feel.",
        price: "964,95",
        id: "18",
        img: hotelbilledeto,
        rating: "4.3 Rating"
      },
    ],
    option4: [
      {
        name: "Pinecrest Pines Campground",
        description: "Experience the outdoors with a camping adventure.",
        price: "152,95",
        id: "19",
        img: hotelbilledefem,
        rating: "8.5 Rating"
      },
      {
        name: "Lakeside Oasis Campgrounds",
        description: "Experience the outdoors with a camping adventure.",
        price: "93,95",
        id: "20",
        img: hotelbilledefire,
        rating: "7.4 Rating"
      },
      {
        name: "Wilderness Haven Campsites",
        description: "Experience the outdoors with a camping adventure.",
        price: "231,95",
        id: "21",
        img: hotelbilledetre,
        rating: "6.9 Rating"
      },
      {
        name: "Tranquil Trails Campground",
        description: "Experience the outdoors with a camping adventure.",
        price: "174,95",
        id: "22",
        img: hotelbilledeto,
        rating: "4.5 Rating"
      },
      {
        name: "Sunset Ridge Campgrounds",
        description: "Experience the outdoors with a camping adventure.",
        price: "197,95",
        id: "23",
        img: hotelbillede,
        rating: "9.7 Rating"
      },
      {
        name: "Whispering Woods Campsite",
        description: "Experience the outdoors with a camping adventure.",
        price: "164,95",
        id: "24",
        img: hotelbilledeseks,
        rating: "8.4 Rating"
      },
    ],
  };

  const [tempSelectedOption, setTempSelectedOption] = useState(selectedOption);

  // Handle dropdown change
  const handleDropdownChange = (event: SelectChangeEvent<string>) => {
    setTempSelectedOption(event.target.value);
  };

  // Toggle list visibility
  const toggleList = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedOption(tempSelectedOption);
      setShowList(true);
      setIsLoading(false);
      localStorage.setItem("city", city);
      setLocalStorage_city(city);
    }, 1000);
  };

  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const handleSavePrice = (price: string) => {
    localStorage.setItem("HOTEL_PRICE", price);
    setSelectedPrice(price);
  };

  const adult = parseInt(localStorage_adult, 10);
  const kids = parseInt(localStorage_kids, 10);
  const total = adult + kids;

    const startingValue = localStorage.getItem("city");

    const [city, setCity] = useState(startingValue || "");
  
    const handleChange = (event: { target: { value: any; }; }) => {
      const newValue = event.target.value;
      setCity(newValue);
    };

  return (
    <Box className="accom-container">
      <div className="search-bar">
        <TextField
          label="City"
          sx={{ margin: "10px", width: "200px" }}
          value={city}
          onChange={handleChange}
        />

        <FormControl sx={{ width: "200px", margin: "10px" }}>
          <InputLabel htmlFor="accommodation-type">
            Accommodation type
          </InputLabel>
          <Select
            value={tempSelectedOption} // Use tempSelectedOption here
            onChange={handleDropdownChange}
            label="Accommodation type"
            id="accommodation-type"
          >
            <MenuItem value="option1">Hotel</MenuItem>
            <MenuItem value="option2">Hostel</MenuItem>
            <MenuItem value="option3">Apartment</MenuItem>
            <MenuItem value="option4">Camping</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="From"
          value={localStorage_from}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ margin: "10px", width: "200px" }}
        />

        <TextField
          label="To"
          value={localStorage_to}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ margin: "10px", width: "200px" }}
        />

        <TextField
          label="Adults"
          value={localStorage_adult}
          InputProps={{ readOnly: true }}
          sx={{ margin: "10px", width: "80px" }}
        />

        <TextField
          label="Kids"
          value={localStorage_kids}
          InputProps={{ readOnly: true }}
          sx={{ margin: "10px", width: "80px" }}
        />

        {!isLoading && (
          <button
            style={{
              margin: "10px",
              height: "56px",
              width: "100px",
              backgroundColor: "white",
              border: "1px solid grey",
            }}
            onClick={toggleList}
          >
            Search
          </button>
        )}
        {isLoading && (
          <button
            style={{
              margin: "10px",
              height: "56px",
              width: "100px",
              backgroundColor: "white",
              border: "1px solid grey",
            }}
            onClick={toggleList}
          >
            <img
              style={{ margin: "0px", marginTop: "-8px" }}
              src={loading_animation}
              alt="Loading..."
              width={"50px"}
              height={"50px"}
            />
          </button>
        )}
      </div>

      <div className="Search-result">
        {showList && (
          <Box className="list-container">
            {lists[selectedOption].map((accommodation, index) => (
              <div className="list-container-items">
                <Box key={index}>
                  <img
                    style={{ margin: "0px", borderRadius: "5px"}}
                    src={accommodation.img}
                    width={"250px"}
                    height={"200px"}
                    
                  />
                  <div className="item-information">
                  <Typography variant="h6" sx={{ mb: "10px" }}>
                    {accommodation.name}
                  </Typography>
                  <Typography variant="body1">{localStorage_city}</Typography>
                  <Typography variant="body1">{`${total} Persons`}</Typography>
                  <Typography variant="body1" sx={{mt: "70px", border: "solid", width: "75px", padding: "5px", borderRadius: "5px", borderColor: "gray"}}>{accommodation.rating}</Typography>
                  </div>
                  <p className="price-hotel">
                    Total price:
                    <br />
                    {`${accommodation.price} EUR`}
                  </p>
                  <p className="save-hotel">
                    <Button
                      onClick={() => handleSavePrice(accommodation.price)}
                      disabled={selectedPrice === accommodation.price}
                      color="primary"
                      variant="contained"
                      style={{
                        height: "50px",
                        width: "130px",
                      }}
                    >
                      {selectedPrice === accommodation.price
                        ? "Saved"
                        : "Save hotel"}
                    </Button>
                  </p>
                </Box>
              </div>
            ))}
          </Box>
        )}
      </div>
    </Box>
  );
}

export default Accom;
