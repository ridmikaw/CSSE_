import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BinCollection from './pages/BinCollection';
import BinPage from './pages/BinsPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
// import PrivateRoute from './components/PrivateRoute';
import './styles/styles.css';
import AddBin from './pages/AddBin';
import { AuthProvider } from './middleware/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          
          <Route path="/add-bin" element={<AddBin />} />
          <Route path="/collections" element={<BinCollection />} />
          <Route path="/bin" element={<BinPage />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
