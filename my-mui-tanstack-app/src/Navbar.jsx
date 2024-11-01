import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6"  style={{ flexGrow: 1 }}>
          Employee Management
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Employee
        </Button>
        <Button color="inherit" component={Link} to="/employee">
          Employee List
        </Button>
        <Button color="inherit" component={Link} to="/create-employee">
          Add Employee
        </Button>
        <Button color="inherit" component={Link} to="/timer">
          Timer
        </Button>
        <Button color="inherit" component={Link} to="/student">
          Student Panel
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
