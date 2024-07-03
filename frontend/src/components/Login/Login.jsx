/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { Snackbar } from '@mui/material';

const Login = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email: form.email, password: form.password });
      console.log('Login response:', response.data); // Add this line to check the response data
      localStorage.setItem('token', response.data.token);
      setSnackbar({ open: true, message: 'Login successful!' });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error); // Add this line to log the error
      setSnackbar({ open: true, message: 'Login failed. Please try again.' });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/register', form);
      console.log('Registration response:', response.data); // Add this line to check the response data
      setSnackbar({ open: true, message: 'Registration successful!' });
      setIsLogin(true);
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error); // Add this line to log the error
      setSnackbar({ open: true, message: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold p-4 text-black">{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        {!isLogin && (
          <input className='p-2'
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        )}
        <input className='p-2'
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input className='p-2'
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        {!isLogin && (
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button className="text-black bg-amber-500 hover:bg-white font-bold py-2 px-4 rounded" type="submit">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button className='text-black p-2' onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
      </button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </div>
  );
};

export default Login;
