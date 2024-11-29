import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Diagnosis from './components/Diagnosis';
import Information from './components/Information';
import History from './components/History';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import './App.css';
import logo from './components/Kmit_logo.png';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent = () => {
    const location = useLocation();
    const noNavbarPaths = ['/', '/sign-up'];

    return (
        <div className="app-container">
            {!noNavbarPaths.includes(location.pathname) && <Navbar />}
            {noNavbarPaths.includes(location.pathname) && <div className="logo-container-login">
                <img src={logo} alt="Logo" className="logo-login" />
            </div>}

            {!noNavbarPaths.includes(location.pathname) && <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>}

            <Routes>
            <Route path="/" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/diagnosis" element={<ProtectedRoute><Diagnosis /></ProtectedRoute>} />
                <Route path="/information" element={<ProtectedRoute><Information /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
            </Routes>
            <footer className="app-footer">
                <div className="footer-text">
                    Developed by Srikar A, Bhavana K, Manasvi P
                </div>
                <div className="footer-text">
                    Guided by Kamal Vijetha
                </div>
            </footer>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
