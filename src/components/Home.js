import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Add styling for the home page

const Home = () => {

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Alzheimer's Detection App</h1>
            </header>
            <div className="home-content">
                <h2>Welcome to Alzheimer's Detection App</h2>
                <p>
                    Our application helps in early diagnosis and monitoring of Alzheimer's disease.
                    By using advanced image processing and deep learning models, we provide quick and reliable predictions to assist medical professionals and individuals.
                </p>
                <p>Navigate through the app to:</p>
                <ul>
                    <li>
                        <strong>Diagnosis</strong>: Upload MRI scans for analysis and get an instant report on the disease stage.
                    </li>
                    <li>
                        <strong>Information</strong>: Learn more about Alzheimer's disease, its symptoms, and prevention tips.
                    </li>
                    <li>
                        <strong>History</strong>: Review past diagnosis results and track your progress over time.
                    </li>
                </ul>
                <p>
                    Use the navigation bar at the top to explore these features and take the first step toward better
                    understanding and managing Alzheimer's disease.
                </p>
            </div>
        </div>
    );
};

export default Home;
