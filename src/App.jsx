import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OshiPick from './pages/OshiPick';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oshipick" element={<OshiPick />} />
      </Routes>
    </Router>
  );
}
