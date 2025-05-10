import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.js'; 

const Signup = () => {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    setError(''); 
  
    try {
      const success = await signup({ name, email, password });
  
      if (success) {
        navigate('/login');
      } else {
        setError('Signup failed. Please try again.'); 
      }
    } catch (err) {
      console.error(err);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create <span className="text-red-500">Account</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white text-lg font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-white text-lg font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-white text-lg font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-white"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white text-lg font-medium mb-1">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-red-500 hover:bg-red-600 transition text-white font-bold text-lg rounded-md"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-zinc-400 mt-4 text-base">
          Already have an account?{' '}
          <Link to="/login" className="text-red-500 hover:underline">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
