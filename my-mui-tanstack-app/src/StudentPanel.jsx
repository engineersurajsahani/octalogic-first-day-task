import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { studentapi } from "./api";

export default function StudentPanel() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // Fetch students
  const { data, isLoading, error } = useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const response = await studentapi.get("/student");
      return response.data;
    },
  });

  // Mutation to delete student
  const deleteStudentMutation = useMutation({
    mutationFn: async (id) => {
      await studentapi.delete(`/student/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["student"]);
    },
  });

  // Mutation to add or update student
  const addOrUpdateStudent = useMutation({
    mutationFn: async (student) => {
      if (editingStudent) {
        await studentapi.put(`/student/${editingStudent._id}`, student);
      } else {
        await studentapi.post("/student", student);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["student"]);
      handleClose();
    },
  });

  const handleClickOpen = (student) => {
    if (student) {
      setEditingStudent(student);
      reset(student); // populate form with student data if editing
    } else {
      setEditingStudent(null); // clear editing state for a new student
      reset(); // clear form if adding new
    }
    setOpen(true);
  };

  // Close dialog and reset editing state
  const handleClose = () => {
    setOpen(false);
    setEditingStudent(null);
    reset();
  };

  // Handle form submission
  const onSubmit = (data) => {
    addOrUpdateStudent.mutate(data);
  };

  // Loading and error states
  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading data</Typography>;

  return (
    <Container className="mt-5 mb-5">
      <Typography variant="h4" component="h1" gutterBottom>
        Student Panel
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClickOpen(null)}
      >
        Add Student
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Roll Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.rollNumber}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.branch}</TableCell>
                <TableCell>
                  <Button onClick={() => handleClickOpen(row)}>Edit</Button>
                  <Button
                    onClick={() => deleteStudentMutation.mutate(row._id)}
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingStudent ? "Update Student" : "Add Student"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("name")}
              label="Name"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register("rollNumber")}
              label="Roll Number"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register("email")}
              label="Email"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register("branch")}
              label="Branch"
              fullWidth
              margin="normal"
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {editingStudent ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
