import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/users/signup', userData);
      // Handle signup success, e.g., redirecting to login
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle signup failure, e.g., showing an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Username" />
      <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
