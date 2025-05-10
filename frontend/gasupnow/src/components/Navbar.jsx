import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import useAdminStore from '../stores/useAdminStore';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token: userToken, logout: userLogout } = useAuthStore();
  const { token: adminToken, logout: adminLogout } = useAdminStore();

  const handleLogout = () => {
    if (userToken) userLogout();
    if (adminToken) adminLogout();
  };

  const isLoggedIn = userToken || adminToken;

  const handleLinkClick = () => setMenuOpen(false);

  const renderLinks = () => {
    if (adminToken) {
      return (
        <>
          <Link to="/admin-dashboard" className="hover:text-red-500 transition">Admin Dashboard</Link>
          <button onClick={handleLogout} className="hover:text-red-500 transition">Logout</button>
        </>
      );
    } else if (userToken) {
      return (
        <>
          <Link to="/dashboard" className="hover:text-red-500 transition">Dashboard</Link>
          <Link to="/order" className="hover:text-red-500 transition">Order</Link>
          <button onClick={handleLogout} className="hover:text-red-500 transition">Logout</button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" className="hover:text-red-500 transition">Login</Link>
          <Link to="/signup" className="hover:text-red-500 transition">Sign Up</Link>
          <Link to="/admin-login" className="hover:text-red-500 transition">Admin Login</Link> {/* Added Admin Login link */}
        </>
      );
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-black to-[#434343] text-white shadow-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 text-3xl font-extrabold tracking-wide">
            <Link to="/" onClick={handleLinkClick}>
              Gas<span className="text-red-500">Up</span>Now
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-lg font-semibold">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <Link to="/about" className="hover:text-red-500 transition">About</Link>
            <Link to="/services" className="hover:text-red-500 transition">Services</Link>
            <Link to="/contact" className="hover:text-red-500 transition">Contact</Link>
            {renderLinks()}
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-2 space-y-3 px-2 pb-4 text-base font-semibold">
            <Link to="/" onClick={handleLinkClick} className="block hover:text-red-500 transition">Home</Link>
            <Link to="/about" onClick={handleLinkClick} className="block hover:text-red-500 transition">About</Link>
            <Link to="/services" onClick={handleLinkClick} className="block hover:text-red-500 transition">Services</Link>
            <Link to="/contact" onClick={handleLinkClick} className="block hover:text-red-500 transition">Contact</Link>
            {renderLinks()}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
