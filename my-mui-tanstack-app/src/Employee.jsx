import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  TextField,
  MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Employee() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("name");

  const { data, isLoading, error } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const response = await api.get("/employee");
      return response.data;
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/employee/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employee"]);
    },
  });

  const updateEmployee = (id) => {
    navigate('/employee/' + id);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading data</Typography>;

  const filteredData = data.filter((employee) => {
    return employee[searchOption]
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <Container className="mt-5 mb-5">
      <Typography variant="h4" gutterBottom>
        Employee Table
      </Typography>
      <Button color="secondary" onClick={() => navigate('/create-employee')}>
        Create Employee
      </Button>
      
      <div style={{ display: 'flex', alignItems: 'center', margin: '1em 0' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: '1em' }}
        />
        <TextField
          select
          label="Filter By"
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
          variant="outlined"
          style={{ width: '150px' }}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="role">Role</MenuItem>
          <MenuItem value="salary">Salary</MenuItem>   
        </TextField>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee._id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => deleteEmployeeMutation.mutate(employee._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => updateEmployee(employee._id)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Employee;
