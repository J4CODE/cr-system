/* eslint-disable no-unused-vars */
// src/components/Dashboard/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/plants" className="dashboard-item">
          <div className="p-4 bg-white rounded shadow hover:bg-gray-100">
            <h2 className="text-xl font-bold">Manage Plants</h2>
            <p>View and manage all your plants.</p>
          </div>
        </Link>
        <Link to="/seed-to-sale" className="dashboard-item">
          <div className="p-4 bg-white rounded shadow hover:bg-gray-100">
            <h2 className="text-xl font-bold">Seed to Sale</h2>
            <p>View and manage all seed to sale records.</p>
          </div>
        </Link>
        <Link to="/packages" className="dashboard-item">
          <div className="p-4 bg-white rounded shadow hover:bg-gray-100">
            <h2 className="text-xl font-bold">Manage Packages</h2>
            <p>View and manage all your packages.</p>
          </div>
        </Link>
        <Link to="/products" className="dashboard-item">
          <div className="p-4 bg-white rounded shadow hover:bg-gray-100">
            <h2 className="text-xl font-bold">Manage Products</h2>
            <p>View and manage all your products.</p>
          </div>
        </Link>
        <Link to="/licenses" className="dashboard-item">
          <div className="p-4 bg-white rounded shadow hover:bg-gray-100">
            <h2 className="text-xl font-bold">Manage Licenses</h2>
            <p>View and manage all your licenses.</p>
          </div>
        </Link>
        <Link to="/users" className="dashboard-item">
          <div className="p-4 bg-white rounded shadow hover:bg-gray-100">
            <h2 className="text-xl font-bold">Manage Users</h2>
            <p>View and manage all your users.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
