import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BinCollection from './pages/BinCollection';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BinCollection />} />
      </Routes>
    </Router>
  );
}

export default App;
