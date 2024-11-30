import React, { useState, useEffect } from "react";
import "./History.css";

const History = ({ username }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/get_records?username=${username}`, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    })
      .then((response) => response.json())
      .then((data) => setRecords(data.records))
      .catch((error) => console.error("Error fetching records:", error));
  }, [username]);

  const handleDelete = (index) => {
    fetch(`http://127.0.0.1:5000/delete_record`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, index }),
    })
      .then((response) => {
        if (response.ok) {
          setRecords(records.filter((_, i) => i !== index));
        } else {
          console.error("Failed to delete record");
        }
      })
      .catch((error) => console.error("Error deleting record:", error));
  };

  return (
    <div className="history-container">
      <h1>MRI Records</h1>
      <p className="recordCount">Total MRI Records: {records.length}</p>
      {records.length > 0 ? (
        <div className="record-list">
          {records.map((record, index) => (
            <div className="record-card" key={index}>
              <img
                src={`data:image/jpeg;base64,${record.image}`}
                alt="MRI Scan"
                className="record-image"
              />
              <div className="record-details">
                <p><strong>Date Scanned:</strong> {record.date_scanned}</p>
                <p><strong>Result:</strong> {record.result.substring(19)}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No MRI records found.</p>
      )}
    </div>
  );
};

export default History;
