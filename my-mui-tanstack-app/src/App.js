import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Button } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employee from "./Employee"; 
import UpdateEmployee from "./UpdateEmployee"; 
import CreateEmployee from "./CreateEmployee";

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
      <Button onClick={toggleTheme} variant="contained" style={{ margin: "16px" }}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </Button>
      <Router>
        <Routes>
          <Route path="/" element={<Employee />} />
          <Route path="/employee/:id" element={<UpdateEmployee />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
