/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import NavigationButtons from '../NavigationButtons/NavigationButtons';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({ packageName: '', productType: '', weight: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await api.get('/packages');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const createOrUpdatePackage = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updatePackage(editId);
    } else {
      await createPackage();
    }
  };

  const createPackage = async () => {
    try {
      await api.post('/packages', form);
      setSnackbar({ open: true, message: 'Package created successfully!' });
      fetchPackages();
      setForm({ packageName: '', productType: '', weight: '' });
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };

  const updatePackage = async (id) => {
    try {
      await api.put(`/packages/${id}`, form);
      setSnackbar({ open: true, message: 'Package updated successfully!' });
      fetchPackages();
      setForm({ packageName: '', productType: '', weight: '' });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const deletePackage = async (id) => {
    try {
      await api.delete(`/packages/${id}`);
      setSnackbar({ open: true, message: 'Package deleted successfully!' });
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleEdit = (pkg) => {
    setForm({ packageName: pkg.packageName, productType: pkg.productType, weight: pkg.weight });
    setEditMode(true);
    setEditId(pkg._id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-black font-bold mb-4">Packages</h1>
      <form onSubmit={createOrUpdatePackage} className="mb-4 flex space-x-2">
        <TextField
          label="Package Name"
          variant="outlined"
          value={form.packageName}
          onChange={(e) => setForm({ ...form, packageName: e.target.value })}
          required
        />
        <TextField
          label="Product Type"
          variant="outlined"
          value={form.productType}
          onChange={(e) => setForm({ ...form, productType: e.target.value })}
          required
        />
        <TextField
          label="Weight (e.g., 1500lbs)"
          variant="outlined"
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
          required
        />
        <Button sx={{
            backgroundColor: '#ebfd00',
            color: 'black',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'green',
              color: 'white'
            },
          }} variant="contained" color="primary" type="submit">
          {editMode ? 'Update Package' : 'Add Package'}
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Package Name</TableCell>
              <TableCell>Product Type</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg._id}>
                <TableCell>{pkg.packageName}</TableCell>
                <TableCell>{pkg.productType}</TableCell>
                <TableCell>{pkg.weight}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(pkg)}>Edit</Button>
                  <Button variant="outlined" color="secondary" onClick={() => deletePackage(pkg._id)}>Delete</Button>
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

export default Packages;
