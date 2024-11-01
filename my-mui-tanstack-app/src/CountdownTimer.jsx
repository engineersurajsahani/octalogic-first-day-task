import React, { useEffect, useState } from "react";
import { Button, Typography, Container } from "@mui/material";

const CountdownTimer = () => {
  const initialTime = 15 * 60; // Countdown starts at 15 minutes
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem("countdownTime");
    return savedTime ? JSON.parse(savedTime) : initialTime;
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timerId;

    if (isActive) {
      timerId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Cleanup on component unmount
    return () => {
      clearInterval(timerId);
    };
  }, [isActive]);

  useEffect(() => {
    // Store the time in local storage
    localStorage.setItem("countdownTime", JSON.stringify(time));
  }, [time]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setTime(initialTime);
    setIsActive(false);
    localStorage.removeItem("countdownTime");
  };

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
        {formatTime(time)}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleStart} disabled={isActive || time === 0}>
        Start
      </Button>
      <Button variant="contained" color="secondary" onClick={handlePause} disabled={!isActive}>
        Pause
      </Button>
      <Button variant="contained" color="error" onClick={handleReset}>
        Reset
      </Button>
    </Container>
  );
};

export default CountdownTimer;
