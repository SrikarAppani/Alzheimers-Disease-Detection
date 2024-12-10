import React, { useState } from "react";
import "./Diagnosis.css";
import AddToDatabaseModal from "./AddToDatabaseModal";

const Diagnosis = ({username}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [result, setResult] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scannedDate, setScannedDate] = useState("");
    const [showAddToDatabase, setShowAddToDatabase] = useState(false);
    const [advice, setAdvice] = useState("");

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
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
            if (response.ok) {
                setResult(`Prediction Result: ${data.result}`);
                provideAdvice(data.result);
                setShowAddToDatabase(true);
            }
            else {
                setResult(`Error: ${data.error}`);
            }
        }
        catch (error) {
            setResult("Error: Unable to connect to the server.");
            console.log(error);
        }
    };

    const handleAddToDatabase = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("username", username);
        formData.append("date", scannedDate);
        formData.append("scan_result", result);

        try {
            const response = await fetch("http://127.0.0.1:5000/add", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                }
            })

            const data = await response.json();
            if(response.ok) {
                setShowAddToDatabase(false);
                alert("Record added successfully!");
                closeModal();
            }
            else{
                alert(`Error: ${data.error}`)
                closeModal();
            }
        }
        catch (error) {
            console.log(error);
            alert("Some error occured!");
            closeModal();
        }
    };

    const provideAdvice = (stage) => {
        switch (stage.toLowerCase()) {
            case "very mild demented":
                setAdvice("Consider monitoring symptoms closely and implementing lifestyle changes to support cognitive function.");
                break;
            case "mild demented":
                setAdvice("Schedule regular follow-ups with your healthcare provider to monitor symptoms and manage daily activities.");
                break;
            case "moderate demented":
                setAdvice("Consult your doctor immediately for a comprehensive treatment plan and to discuss potential therapies and support options.");
                break;
            case "non demented":
                setAdvice("Maintain a healthy lifestyle and consider periodic check-ups to monitor cognitive health.");
                break;
            default:
                setAdvice("Please consult a specialist for a personalized plan of care.");
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
                {showAddToDatabase && <button onClick={openModal}>Add to Databse</button>}
            </div>
            {result && <p className="result">{result}</p>}
            {advice && <p className="advice">{advice}</p>}
            <div className="addtodatabasemodal">
                <AddToDatabaseModal isOpen={isModalOpen} onClose={closeModal}>
                    <form onSubmit={handleAddToDatabase}>
                        <label for="date_scanned">Enter Scanned date:</label>
                        <input
                        type="date"
                        value={scannedDate}
                        id="date_scanned"
                        onChange={(e) => setScannedDate(e.target.value)}
                        required
                        />
                        <button type="submit">Add</button>
                    </form>
                </AddToDatabaseModal>
            </div>
        </div>
    );
};

export default Diagnosis;
