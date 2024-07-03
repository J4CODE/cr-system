import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Plants from './components/Plants/Plants';
import Packages from './components/Package/Package';
import Products from './components/Product/Product';
import Licenses from './components/Licensing/Licenses';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';
import SeedToSale from './components/SeedToSale/SeedToSale';
import UserList from './components/UserList/UserList';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plants"
          element={
            <ProtectedRoute>
              <Plants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/packages"
          element={
            <ProtectedRoute>
              <Packages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/licenses"
          element={
            <ProtectedRoute>
              <Licenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seed-to-sale"
          element={
            <ProtectedRoute>
              <SeedToSale />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-list"
          element={
            <ProtectedRoute adminOnly>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute adminOnly>
              <UserList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
