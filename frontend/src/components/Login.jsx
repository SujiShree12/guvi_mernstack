import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      localStorage.setItem('userId', response.data.userId);

      console.log(response.data);
      console.log('Login successful');
      console.log('Token:', response.data.token);

      // Alert for successful login
      alert('Login successful');

      // Redirect to the profile page
      navigate('/profile');
    } catch (error) {
      console.error('Login failed', error.response?.data || error.message);

      // Alert for incorrect email or password
      alert('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Register here</Link>.
      </p>
    </div>
  );
};

export default Login;
