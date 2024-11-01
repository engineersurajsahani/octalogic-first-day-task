import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Employee from './Employee';
import UpdateEmployee from './UpdateEmployee';
import CreateEmployee from './CreateEmployee';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Employee />} />
          <Route path="/employee/:id" element={<UpdateEmployee />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
        </Routes>
    </Router>
  );
}

export default App;
