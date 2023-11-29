import "./Home.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    //localStorage.setItem("activeStep", "1");
    navigate("/Fly");
  };

  return (
    <div className="container">
      <Button className="button" onClick={handleNextClick}  sx={{fontSize: 50, fontWeight: 'bold', color: 'white',}}>
        Start your journey 
      </Button>
    </div>
  );
};

export default Home;