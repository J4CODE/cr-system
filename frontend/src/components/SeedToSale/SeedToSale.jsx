/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import NavigationButtons from '../NavigationButtons/NavigationButtons';

const SeedToSale = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ itemName: '', category: '', status: '', quantity: '', location: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await api.get('/seed-to-sale');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const createOrUpdateRecord = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateRecord(editId);
    } else {
      await createRecord();
    }
  };

  const createRecord = async () => {
    try {
      await api.post('/seed-to-sale', form);
      setSnackbar({ open: true, message: 'Record created successfully!' });
      fetchRecords();
      setForm({ itemName: '', category: '', status: '', quantity: '', location: '' });
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  const updateRecord = async (id) => {
    try {
      await api.put(`/seed-to-sale/${id}`, form);
      setSnackbar({ open: true, message: 'Record updated successfully!' });
      fetchRecords();
      setForm({ itemName: '', category: '', status: '', quantity: '', location: '' });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await api.delete(`/seed-to-sale/${id}`);
      setSnackbar({ open: true, message: 'Record deleted successfully!' });
      fetchRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const handleEdit = (record) => {
    setForm({ itemName: record.itemName, category: record.category, status: record.status, quantity: record.quantity, location: record.location });
    setEditMode(true);
    setEditId(record._id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-black font-bold mb-4">Seed to Sale</h1>
      <form onSubmit={createOrUpdateRecord} className="mb-4 flex space-x-2">
        <TextField
          label="Item Name"
          variant="outlined"
          value={form.itemName}
          onChange={(e) => setForm({ ...form, itemName: e.target.value })}
          required
        />
        <TextField
          label="Category"
          variant="outlined"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <TextField
          label="Status"
          variant="outlined"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          required
        />
        <TextField
          label="Quantity"
          variant="outlined"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <TextField
          label="Location"
          variant="outlined"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
        <Button
          sx={{
            backgroundColor: '#ebfd00',
            color: 'black',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'green',
              color: 'white'
            },
          }}
          variant="contained"
          type="submit"
        >
          {editMode ? 'Update Record' : 'Add Record'}
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record._id}>
                <TableCell>{record.itemName}</TableCell>
                <TableCell>{record.category}</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>{record.quantity}</TableCell>
                <TableCell>{record.location}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(record)}>Edit</Button>
                  <Button variant="outlined" color="secondary" onClick={() => deleteRecord(record._id)}>Delete</Button>
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

export default SeedToSale;
