import "./Home.css";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    //localStorage.setItem("activeStep", "1");
    navigate("/Fly");
  };

  useEffect(() => {
    const handlePageLoad = () => {
      const adults = parseInt(localStorage.getItem('ADULTS') ?? '0', 10);
      const kids = parseInt(localStorage.getItem('KIDS') ?? '0', 10);
      if (adults + kids === 0) {
        localStorage.setItem('ADULTS', '1');
      }
  
    };
  
    handlePageLoad();
  }, []);


  return (
    <div className="container">
      <Button
        className="button"
        onClick={handleNextClick}
        sx={{
          fontSize: 50,
          fontWeight: 'bold',
          color: 'white',
          '&:hover': {border: '5px solid #ffffff',}}}>
        Start your journey 
      </Button>
    </div>
  );
};

export default Home;

