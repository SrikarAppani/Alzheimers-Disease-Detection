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
