import React, { useState } from "react";
import "./Diagnosis.css";

const Diagnosis = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [result, setResult] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file)); // Generate a preview URL for the uploaded image
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setResult(`Prediction Result: ${data.result}`);
            } else {
                setResult(`Error: ${data.error}`);
            }
        } catch (error) {
            setResult("Error: Unable to connect to the server.");
            console.log(error);
        }
    };

    return (
        <div className="diagnosis-container">
            <h1>Get Your Diagnosis Done</h1>
            <div className="upload-section">
                <h2>Upload Your MRI</h2>
                <input type="file" onChange={handleFileChange} accept="image/*" />
                {previewUrl && (
                    <div className="image-preview">
                        <h3>Uploaded MRI:</h3>
                        <img src={previewUrl} alt="Uploaded MRI" />
                    </div>
                )}
                <button onClick={handleUpload}>Predict</button>
            </div>
            {result && <p className="result">{result}</p>}
        </div>
    );
};

export default Diagnosis;
