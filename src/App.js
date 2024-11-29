import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Diagnosis from './components/Diagnosis';
import Information from './components/Information'; // Make sure this file exists
import History from './components/History'; // Make sure this file exists
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent = () => {
    const location = useLocation(); // Hook to get the current location

    // List of paths where the Navbar should not be displayed
    const noNavbarPaths = ['/', '/sign-up'];

    return (
        <div>
            {/* Conditionally render Navbar based on the current path */}
            {!noNavbarPaths.includes(location.pathname) && <Navbar />}
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/diagnosis" element={<ProtectedRoute><Diagnosis /></ProtectedRoute>} />
                <Route path="/information" element={<ProtectedRoute><Information /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
            </Routes>
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
