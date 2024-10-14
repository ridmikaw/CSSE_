import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import axios from 'axios';
import API_ENDPOINTS from '../config'; // Make sure to adjust the path to your API endpoint config

const QRScanner = ({ onScanComplete, onClose }) => {
  const [error, setError] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [weight, setWeight] = useState(''); // State to store weight input

  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
      onScanComplete(data); // Pass scanned data to parent component
    }
  };

  const handleError = (err) => {
    setError(err);
  };

  const handleSubmit = async () => {
    if (scannedData && weight) {
      try {
        const response = await axios.post(`${API_ENDPOINTS.POST_BIN_DETAILS}`, {
          binId: scannedData,
          weight: parseFloat(weight),
        });

        // Handle success response
        alert('Bin details submitted successfully!');
        onClose(); // Close scanner
      } catch (error) {
        console.error('Error submitting bin details:', error);
        alert('Failed to submit bin details. Please try again.');
      }
    } else {
      alert('Please scan a bin and enter a weight.');
    }
  };

  return (
    <div className="qr-scanner-container flex flex-col items-center justify-center">
      <button onClick={onClose} className="close-button text-red-500 mb-4">
        Close
      </button>
      <QrReader
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%', maxWidth: '400px' }}
      />
      {error && <p className="text-red-500">{error.message}</p>}
      {scannedData && (
        <div className="mt-4">
          <p>Scanned Bin ID: {scannedData}</p>
          <input
            type="number"
            placeholder="Enter Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="submit-button bg-green-500 hover:bg-green-600 text-white py-2 rounded mt-4"
          >
            Submit Bin Details
          </button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
