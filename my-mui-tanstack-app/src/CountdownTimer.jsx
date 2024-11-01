import React from "react";
import { Button, Typography, Container } from "@mui/material";
import { useCountdown } from "./CountdownContext";

const CountdownTimer = () => {
  const { state, dispatch } = useCountdown();

  const handleStart = () => dispatch({ type: "START" });
  const handlePause = () => dispatch({ type: "PAUSE" });
  const handleReset = () => dispatch({ type: "RESET" });

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Countdown Timer
      </Typography>
      <Typography variant="h2" gutterBottom>
        {formatTime(state.time)}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleStart} disabled={state.isActive || state.time === 0}>
        Start
      </Button>
      <Button variant="contained" color="secondary" onClick={handlePause} disabled={!state.isActive}>
        Pause
      </Button>
      <Button variant="contained" color="error" onClick={handleReset}>
        Reset
      </Button>
    </Container>
  );
};

export default CountdownTimer;
