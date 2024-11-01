import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api"; 
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";

function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    salary: "",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const response = await api.get(`/employee/${id}`);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        salary: response.data.salary,
      });
      return response.data;
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: async (updatedData) => {
      await api.put(`/employee/${id}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employee"]);
      navigate("/");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployeeMutation.mutate(formData);
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error loading employee data</Typography>;

  return (
    <Container className="mt-5 mb-5" maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Update Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Salary"
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update
        </Button>
      </form>
    </Container>
  );
}

export default UpdateEmployee;
