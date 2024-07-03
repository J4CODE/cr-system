/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.post('/users/register', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({ open: true, message: 'User created successfully!' });
      fetchUsers();
      setForm({ username: '', email: '', password: '', role: 'user' });
    } catch (error) {
      console.error('Error creating user:', error);
      setSnackbar({ open: true, message: 'Error creating user' });
    }
  };

  const updateUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/users/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({ open: true, message: 'User updated successfully!' });
      fetchUsers();
      setForm({ username: '', email: '', password: '', role: 'user' });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error updating user:', error);
      setSnackbar({ open: true, message: 'Error updating user' });
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({ open: true, message: 'User deleted successfully!' });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error);
      setSnackbar({ open: true, message: 'Error deleting user' });
    }
  };

  const handleEdit = (user) => {
    setForm({ username: user.username, email: user.email, password: '', role: user.role });
    setEditMode(true);
    setEditId(user._id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateUser(editId);
    } else {
      createUser();
    }
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#ebfd00',
    color: 'black',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: 'green',
      color: 'white',
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="mb-4 flex space-x-2">
        <Link to="/dashboard">
          <Button sx={buttonStyle} variant="contained">
            Return to Dashboard
          </Button>
        </Link>
        <Button
          sx={buttonStyle}
          variant="contained"
          onClick={() => window.history.back()}
        >
          Back to Previous Page
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="mb-4 flex space-x-2">
        <TextField
          label="Username"
          variant="outlined"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required={!editMode}
        />
        <TextField
          label="Role"
          variant="outlined"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
        />
        <Button
          sx={buttonStyle}
          variant="contained"
          type="submit"
        >
          {editMode ? 'Update User' : 'Add User'}
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(user)}>Edit</Button>
                  <Button variant="outlined" color="secondary" onClick={() => deleteUser(user._id)}>Delete</Button>
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
    </div>
  );
};

export default UserList;
