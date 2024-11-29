import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"; // Add styling for the navigation bar

const Navbar = ({ handleLogout }) => {
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState(location.pathname);

    const handleClick = (path) => {
        setSelectedTab(path);
    };

    return (
        <nav className="navbar">
            <ul>
                <li className={selectedTab === "/home" ? "nav-item clicked" : "nav-item"}>
                    <Link to="/home" onClick={() => handleClick("/home")}>Home</Link>
                </li>
                <div className="separator"></div>
                <li className={selectedTab === "/diagnosis" ? "nav-item clicked" : "nav-item"}>
                    <Link to="/diagnosis" onClick={() => handleClick("/diagnosis")}>Diagnosis</Link>
                </li>
                <div className="separator"></div>
                <li className={selectedTab === "/information" ? "nav-item clicked" : "nav-item"}>
                    <Link to="/information" onClick={() => handleClick("/information")}>Information</Link>
                </li>
                <div className="separator"></div>
                <li className={selectedTab === "/history" ? "nav-item clicked" : "nav-item"}>
                    <Link to="/history" onClick={() => handleClick("/history")}>History</Link>
                </li>
            </ul>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
