import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "react-modal";
import { useNavigate, useLocation } from "react-router-dom";
import { getInterestString } from "../../src/TripPrompt/InterestsPrompt";
import { useState } from "react";

const stepPaths = [
  "/",
  "/flight",
  "/accommodation",
  "/interest",
  "/experiences",
  "/overview",
];

const stepNames = ["Home", "Flight", "Accommodation", "Interest", "Experiences", "Overview"];

const STORAGE_KEY = "CURRENT_PAGE_STEP";

Modal.setAppElement("#root");

export default function HorizontalLinearStepper() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = React.useState(() => {
    const storedStep = localStorage.getItem(STORAGE_KEY);
    return storedStep ? parseInt(storedStep, 10) : 0;
  });
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (_step: number) => {
    return false;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === stepPaths.length - 1) {
      handleReset();
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      if (activeStep === 3){
        getInterestString();
      }

      const cityValue = localStorage.getItem("city");
      const accomValue = localStorage.getItem("AccommodationType");
      if (activeStep === 1 && (cityValue === "" || cityValue === null)) {
        alert("Please select an flight before the next step");
      } else if (activeStep === 2 && (accomValue === "" || accomValue === null)) {
        alert("Please select an Accommodation before the next step");
      }else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        navigate(stepPaths[activeStep + 1]);
      }
      
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      const newActiveStep = prevActiveStep - 1;
      console.log("Navigating back to:", stepPaths[newActiveStep]);
      navigate(stepPaths[newActiveStep]);
      return newActiveStep;
    });
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
    navigate(stepPaths[activeStep + 1]);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReset = () => {
    
    setIsModalOpen(true);
  };

  const handleModalYes = () => {
    setActiveStep(0);
    localStorage.clear();
    navigate(stepPaths[0]);
    setIsModalOpen(false);
  };

  const handleModalNo = () => {
    setIsModalOpen(false);
  };

  const handleBeforeUnload = () => {
    localStorage.setItem(STORAGE_KEY, "0");
  };

  React.useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  React.useEffect(() => {
    const currentStep = stepPaths.indexOf(location.pathname);
    const isValidStep = currentStep !== -1 ? currentStep : 0;
    setActiveStep(isValidStep);
  }, [location.pathname, stepPaths]);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(activeStep));
  }, [activeStep]);

  return (
    <Box sx={{ width: "80%", marginTop: "10px", display: "flex", flexDirection: "row", }}>
      <React.Fragment>
        {activeStep !== 0 && (
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{
              height: "60px",
              width: "10%",
              fontSize: "20px",
              marginTop: "10px",
              border: "solid",
              backgroundColor: "white",
              marginRight: "30px",
              borderRadius: "15px",
              borderWidth: "3px",
              '&:hover': {
                backgroundColor: "white",
              }
            }}
          >
            Back
          </Button>
        )}
        <Box sx={{ flex: "1 1 auto" }} />
        <Stepper activeStep={activeStep} sx={{ flex: "1 1 auto", width: "80%", marginTop: "-20px", marginLeft: activeStep === 0 ? "10%" : 0, marginRight: activeStep === 0 ? "10%" : 0, }}>
          {stepNames.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {isStepOptional(activeStep) && (
          <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
            Skip
          </Button>
        )}
        {activeStep !== 0 && (
          <Button
            onClick={handleNext}
            sx={{
              height: "60px",
              width: "10%",
              fontSize: "20px",
              marginTop: "10px",
              border: "solid",
              backgroundColor: "white",
              marginLeft: "30px",
              borderRadius: "15px",
              borderWidth: "3px",
              '&:hover': {
                backgroundColor: "white",
              }
            }}
          >
            {activeStep === stepPaths.length - 1 ? "Finish" : "Next"}
          </Button>
        )}
      </React.Fragment>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmation Modal"
        style={{
          content: {
            width: "500px",
            height: "200px",
            margin: "auto",
            textAlign: "center",
            fontWeight: "bold"
          },
        }}
      >
        <div>
          <p style={{ margin: "20px" }}>Are you finished?</p>
          <button style={{ margin: "10px" , backgroundColor: "rgb(209, 235, 198)",}} onClick={handleModalYes}>
            Yes, I'm done
          </button>
          <button style={{ margin: "10px", backgroundColor: "#e1e1e1" }} onClick={handleModalNo}>
            No, I'm not done
          </button>
        </div>
      </Modal>
    </Box>
  );
}
