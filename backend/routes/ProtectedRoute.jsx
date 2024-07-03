import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, adminOnly }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  const decoded = jwt_decode(token);
  if (adminOnly && decoded.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  adminOnly: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  adminOnly: false,
};

export default ProtectedRoute;
