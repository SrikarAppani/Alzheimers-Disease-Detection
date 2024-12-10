import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ( {username} ) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(location.pathname);
    
    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/");
    };

    const handleClick = (path) => {
        setSelectedTab(path);
    };

    return (
        <nav className="navbar">
            <ul>
            <li className={selectedTab === "/home" ? "nav-item clicked" : "nav-item"}>
                    <Link to="/home" onClick={() => handleClick("/home")}>Home</Link>
                </li>
                <li className={selectedTab === "/diagnosis" ? "nav-item clicked" : "nav-item"}>
                    <Link to="/diagnosis" onClick={() => handleClick("/diagnosis")}>Diagnosis</Link>
                </li>
                <li className={selectedTab === "/information" ? "nav-item clicked" : "nav-item"}>
                    <Link to="/information" onClick={() => handleClick("/information")}>Information</Link>
                </li>
                <li className={selectedTab === "/history" ? "nav-item clicked" : "nav-item"}>
                    <Link to="/history" onClick={() => handleClick("/history")}>History</Link>
                </li>
            </ul>
            <button className="logout-button" onClick={handleLogout}>Logout ({username})</button>
        </nav> 
    );
};

export default Navbar;
