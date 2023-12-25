import React, { useState } from 'react';
import './registration.css';
import { FaRegUser } from 'react-icons/fa';
import { LiaUniversitySolid } from 'react-icons/lia';
import { HiOutlineMail } from 'react-icons/hi';
import { FaLock } from 'react-icons/fa';
import { FaUserLock } from 'react-icons/fa6';
import { FaEthereum } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Registration = () => {
  const [universityName, setUniversityName] = useState('');
  const [universityEmail, setUniversityEmail] = useState('');
  const [universityAddress, setUniversityAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const ethAddressRegex = /^0x[0-9a-fA-F]{40}$/;

    if (!ethAddressRegex.test(universityAddress)) {
      setError('Enter Valid Ethereum Address');
      return;
    }

    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    const formData = {
      universityName,
      universityEmail,
      universityAddress,
      username,
      password
    };

    setLoading(true);

    axios.post("http://localhost:5555/register", formData)
      .then(() => {
        setLoading(false);
        navigate('/login');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 400) {
          setError('User or institute with the provided details already exists');
        } else {
          setError("Error happened. Please check the console for more details.");
          console.error(error);
        }
      });
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Institute Registration</h1>

        <div className='input-box'>
          <input
            type='text'
            placeholder='University Name'
            required
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
          />
          <LiaUniversitySolid className='icon' />
        </div>

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
            type='text'
            placeholder='University Address'
            required
            value={universityAddress}
            onChange={(e) => setUniversityAddress(e.target.value)}
          />
          <FaEthereum className='icon' />
        </div>

        <h3>Create a Username:</h3>
        <div className='input-box'>
          <input
            type='text'
            placeholder='Username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaRegUser className='icon' />
        </div>

        <h3>Create a Password:</h3>
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

        <div className='input-box'>
          <input
            type='password'
            placeholder='Confirm Password'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FaUserLock className='icon' />
        </div>

        {error && <p className='error'>{error}</p>}

        <button type='submit'>Register</button>
      </form>
    </div>
  );
};
