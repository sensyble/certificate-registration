import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Registration } from './components/registration';
import { Login } from './components/login';
import { Home } from './components/home';

function App() {

  return (
    <Router>
 
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>

    </Router>
  );
}

export default App;
