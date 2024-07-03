/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import NavigationButtons from '../NavigationButtons/NavigationButtons';

const Licenses = () => {
  const [licenses, setLicenses] = useState([]);
  const [form, setForm] = useState({ licenseName: '', type: '', status: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    try {
      const response = await api.get('/licenses');
      setLicenses(response.data);
    } catch (error) {
      console.error('Error fetching licenses:', error);
    }
  };

  const createOrUpdateLicense = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateLicense(editId);
    } else {
      await createLicense();
    }
  };

  const createLicense = async () => {
    try {
      await api.post('/licenses', form);
      setSnackbar({ open: true, message: 'License created successfully!' });
      fetchLicenses();
      setForm({ licenseName: '', type: '', status: '' });
    } catch (error) {
      console.error('Error creating license:', error);
    }
  };

  const updateLicense = async (id) => {
    try {
      await api.put(`/licenses/${id}`, form);
      setSnackbar({ open: true, message: 'License updated successfully!' });
      fetchLicenses();
      setForm({ licenseName: '', type: '', status: '' });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error updating license:', error);
    }
  };

  const deleteLicense = async (id) => {
    try {
      await api.delete(`/licenses/${id}`);
      setSnackbar({ open: true, message: 'License deleted successfully!' });
      fetchLicenses();
    } catch (error) {
      console.error('Error deleting license:', error);
    }
  };

  const handleEdit = (license) => {
    setForm({ licenseName: license.licenseName, type: license.type, status: license.status });
    setEditMode(true);
    setEditId(license._id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-black font-bold mb-4">Licenses</h1>
      <form onSubmit={createOrUpdateLicense} className="mb-4 flex space-x-2">
        <TextField
          label="License Name"
          variant="outlined"
          value={form.licenseName}
          onChange={(e) => setForm({ ...form, licenseName: e.target.value })}
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
          label="Status"
          variant="outlined"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          required
        />
        <Button
          sx={{
            backgroundColor: '#ebfd00',
            color: 'black',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'green',
              color: 'white',
            },
          }}
          variant="contained"
          type="submit"
        >
          {editMode ? 'Update License' : 'Add License'}
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>License Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {licenses.map((license) => (
              <TableRow key={license._id}>
                <TableCell>{license.licenseName}</TableCell>
                <TableCell>{license.type}</TableCell>
                <TableCell>{license.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(license)}>Edit</Button>
                  <Button variant="outlined" color="secondary" onClick={() => deleteLicense(license._id)}>Delete</Button>
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

export default Licenses;
