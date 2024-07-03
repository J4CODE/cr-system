/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import api from "../../api";
import {
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import NavigationButtons from "../NavigationButtons/NavigationButtons";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [form, setForm] = useState({ name: "", type: "", growthStage: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await api.get("/plants");
      setPlants(response.data);
    } catch (error) {
      console.error("There was an Error fetching the plants:", error);
    }
  };

  const createOrUpdatePlant = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updatePlant(editId);
    } else {
      await createPlant();
    }
  };

  const createPlant = async () => {
    try {
      await api.post("/plants", form);
      setSnackbar({
        open: true,
        message: "The Plant was created successfully!",
      });
      fetchPlants();
      setForm({ name: "", type: "", growthStage: "" });
    } catch (error) {
      console.error("Uh Oh! There was an Error creating the plant:", error);
    }
  };

  const updatePlant = async (id) => {
    try {
      await api.put(`/plants/${id}`, form);
      setSnackbar({
        open: true,
        message: "The Plant was updated successfully!",
      });
      fetchPlants();
      setForm({ name: "", type: "", growthStage: "" });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error("Uh Oh! There was an Error updating the plant:", error);
    }
  };

  const deletePlant = async (id) => {
    try {
      await api.delete(`/plants/${id}`);
      setSnackbar({
        open: true,
        message: "The Plant was deleted successfully!",
      });
      fetchPlants();
    } catch (error) {
      console.error("Uh Oh! There was an Error deleting the plant:", error);
    }
  };

  const handleEdit = (plant) => {
    setForm({
      name: plant.name,
      type: plant.type,
      growthStage: plant.growthStage,
    });
    setEditMode(true);
    setEditId(plant._id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-black font-bold mb-4">Plants</h1>
      <form onSubmit={createOrUpdatePlant} className="mb-4 flex space-x-2">
        <TextField
          label="Name"
          variant="outlined"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <TextField
          label="Type"
          variant="outlined"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          required
        />
        <TextField
          label="Growth Stage"
          variant="outlined"
          value={form.growthStage}
          onChange={(e) => setForm({ ...form, growthStage: e.target.value })}
          required
        />

        <Button
          sx={{
            backgroundColor: "#ebfd00",
            color: "black",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "green",
              color: "white",
            },
          }}
          variant="contained"
          color="primary"
          type="submit"
        >
          {editMode ? "Update Plant" : "Add Plant"}
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Growth Stage</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plants.map((plant) => (
              <TableRow key={plant._id}>
                <TableCell>{plant.name}</TableCell>
                <TableCell>{plant.type}</TableCell>
                <TableCell>{plant.growthStage}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(plant)}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => deletePlant(plant._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
      <NavigationButtons />
    </div>
  );
};

export default Plants;
