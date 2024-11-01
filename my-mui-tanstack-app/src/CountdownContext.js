// CountdownContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial countdown state
const initialTime = 15 * 60; // 15 minutes in seconds

// Reducer for countdown state
const countdownReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return { ...state, isActive: true };
    case "PAUSE":
      return { ...state, isActive: false };
    case "RESET":
      return { time: initialTime, isActive: false };
    case "TICK":
      return { ...state, time: Math.max(state.time - 1, 0) };
    default:
      return state;
  }
};

// Create context
const CountdownContext = createContext();

// Provider component
export const CountdownProvider = ({ children }) => {
  const [state, dispatch] = useReducer(countdownReducer, {
    time: JSON.parse(localStorage.getItem("countdownTime")) || initialTime,
    isActive: false,
  });

  useEffect(() => {
    let timer;
    if (state.isActive && state.time > 0) {
      timer = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    }

    // Save the time to local storage whenever it updates
    localStorage.setItem("countdownTime", JSON.stringify(state.time));

    // Cleanup on unmount or when timer stops
    return () => clearInterval(timer);
  }, [state.isActive, state.time]);

  return (
    <CountdownContext.Provider value={{ state, dispatch }}>
      {children}
    </CountdownContext.Provider>
  );
};

// Custom hook to use countdown context
export const useCountdown = () => {
  const context = useContext(CountdownContext);
  if (!context) {
    throw new Error("useCountdown must be used within a CountdownProvider");
  }
  return context;
};
