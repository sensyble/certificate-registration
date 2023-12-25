// Login.jsx
import React, { useState } from 'react';
import './login.css';
import { HiOutlineMail } from 'react-icons/hi';
import { FaLock } from 'react-icons/fa';
import axios from 'axios';

export const Login = () => {
  const [universityEmail, setUniversityEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Send a POST request to the login endpoint
      const response = await axios.post('http://localhost:5555/login', {
        universityEmail,
        password,
      });

      // Reset loading state
      setLoading(false);

      // Handle success, you may redirect or perform other actions here
      console.log(response.data.message);
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.status === 400) {
        setError('Invalid credentials');
      } else {
        setError('Error logging in. Please check the console for more details.');
        console.error(error);
      }
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Institute Login</h1>

        <div className='input-box'>
          <input
            type='text'
            placeholder='University Email'
            required
            value={universityEmail}
            onChange={(e) => setUniversityEmail(e.target.value)}
          />
          <HiOutlineMail className='icon' />
        </div>

        <div className='input-box'>
          <input
            type='password'
            placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className='icon' />
        </div>

        {error && <p className='error'>{error}</p>}

        <button type='submit'>Login</button>
      </form>
    </div>
  );
};
