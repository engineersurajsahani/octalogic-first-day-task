import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Button } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employee from "./Employee"; 
import UpdateEmployee from "./UpdateEmployee"; 
import CreateEmployee from "./CreateEmployee";
import EmployeePanel from "./EmployeePanel";
import Navbar from "./Navbar";
import CountdownTimer from "./CountdownTimer";
import StudentPanel from "./StudentPanel";
import { CountdownProvider } from "./CountdownContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Create a theme instance
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button onClick={toggleTheme} variant="contained" style={{ margin: "16px",float:"right" }}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </Button>
      <CountdownProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/employee" element={<Employee />} />
          <Route path="/employee/:id" element={<UpdateEmployee />} />
          <Route path="/create-employee" element={<CreateEmployee />} />

          <Route path="/" element={<EmployeePanel />} />

          <Route path="/timer" element={<CountdownTimer />} />

          <Route path="/student" element={<StudentPanel />} />
        </Routes>
      </Router>
      </CountdownProvider>
    </ThemeProvider>
  );
}

export default App;
