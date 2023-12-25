import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export const Home = () => {
  return (
    <div className='boxx'>
      <h2 className='head'>  For Institute Admin</h2>
      <br/>


      <Link to="/registration">
        <button>Institute Registration</button>
      </Link>
      <br/>
      <Link to="/login">
        <button>Institute Login</button>
      </Link>
    </div>
  );
};

