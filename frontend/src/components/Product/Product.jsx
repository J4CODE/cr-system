/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import NavigationButtons from '../NavigationButtons/NavigationButtons';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productName: '', category: '', price: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const createOrUpdateProduct = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateProduct(editId);
    } else {
      await createProduct();
    }
  };

  const createProduct = async () => {
    try {
      await api.post('/products', form);
      setSnackbar({ open: true, message: 'Product created successfully!' });
      fetchProducts();
      setForm({ productName: '', category: '', price: '' });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const updateProduct = async (id) => {
    try {
      await api.put(`/products/${id}`, form);
      setSnackbar({ open: true, message: 'Product updated successfully!' });
      fetchProducts();
      setForm({ productName: '', category: '', price: '' });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error updating product:', error);
      setSnackbar({ open: true, message: 'Error updating product' });
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setSnackbar({ open: true, message: 'Product deleted successfully!' });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setForm({ productName: product.productName, category: product.category, price: product.price });
    setEditMode(true);
    setEditId(product._id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-black font-bold mb-4">Products</h1>
      <form onSubmit={createOrUpdateProduct} className="mb-4 flex space-x-2">
        <TextField
          label="Product Name"
          variant="outlined"
          value={form.productName}
          onChange={(e) => setForm({ ...form, productName: e.target.value })}
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
          label="Price"
          variant="outlined"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
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
          {editMode ? 'Update Product' : 'Add Product'}
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button variant="outlined" color="secondary" onClick={() => deleteProduct(product._id)}>Delete</Button>
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

export default Products;
