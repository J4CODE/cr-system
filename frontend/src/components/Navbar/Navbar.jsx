/* eslint-disable no-undef */
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setRole(null);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-green-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between max-w-5xl">
        <h1 className="text-lg font-bold flex-shrink-0">&nbsp; My Canna Reg System &nbsp;&nbsp;&nbsp;</h1>
        <div className="flex space-x-4 items-center">
          <Link to="/" className="text-white hover:text-green-300 font-bold">Home</Link>
          <Link to="/plants" className="text-white hover:text-green-300 font-bold">Plants</Link>
          <Link to="/packages" className="text-white hover:text-green-300 font-bold">Packages</Link>
          <Link to="/products" className="text-white hover:text-green-300 font-bold">Products</Link>
          <Link to="/licenses" className="text-white hover:text-green-300 font-bold">Licenses</Link>
          <Link to="/seed-to-sale" className="text-white hover:text-green-300 font-bold">Seed to Sale</Link>
          {role === 'admin' && (
            <Link to="/user-list" className="text-white hover:text-green-300 font-bold">User List</Link>
          )}
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white hover:text-green-300 font-bold">Guides</button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                <a href="https://www.mendocinocounty.gov/home/showpublisheddocument/64512/638506982269870000" target='_blank' className="block px-4 py-2 text-white bg-black hover:bg-lime-200">What is Metrc?</a>
                <a href="https://www.mendocinocounty.gov/home/showpublisheddocument/64510/638506982265200000" target='_blank' className="block px-4 py-2 text-white bg-black hover:bg-lime-200">Plant & Package Tracking</a>
                <a href="https://www.mendocinocounty.gov/home/showpublisheddocument/64506/638506982257070000" target='_blank' className="block px-4 py-2 text-white bg-black hover:bg-lime-200">Anatomy of a Tag</a>
              </div>
            )}
          </div>
          {token ? (
            <button onClick={handleLogout} className="bg-yellow-600 text-black hover:bg-white px-4 py-2 rounded font-bold">Logout</button>
          ) : (
            <Link to="/login" className="bg-amber-500 hover:bg-white px-4 py-2 rounded text-black">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
