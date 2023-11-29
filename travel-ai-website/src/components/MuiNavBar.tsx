import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";

const stepPaths = [
  "/",
  "/Fly",
  "/Hotel",
  "/persons",
  "/oplevelser",
  "/overview",
];

const stepNames = ["Home", "Fly", "Hotel", "Persons", "Oplevelser", "Overview"];
 
const STORAGE_KEY = "CURRENT_PAGE_STEP";

export default function HorizontalLinearStepper() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = React.useState(() => {
    const storedStep = localStorage.getItem(STORAGE_KEY);
    return storedStep ? parseInt(storedStep, 10) : 0;
  });
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return false
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === stepPaths.length - 1) {
      console.log("Finish button clicked. Perform final actions.");
      handleReset();
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      navigate(stepPaths[activeStep + 1]);
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

  const handleReset = () => {
    setActiveStep(0);
    localStorage.setItem(STORAGE_KEY, "0");
    navigate(stepPaths[0]);
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
    <Box sx={{ width: "80%" , marginTop: "10px"}}>
      <Stepper activeStep={activeStep}>
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
      {activeStep === stepPaths.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {activeStep !== 0 && (
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {activeStep !== 0 && (
            <Button onClick={handleNext}>
              {activeStep === stepPaths.length - 1 ? "Finish" : "Next"}
            </Button>
          )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
