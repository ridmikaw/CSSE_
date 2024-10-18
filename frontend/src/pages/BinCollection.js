import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation
import TabBar from '../components/TabBar';
import QRLinkCard from '../components/QRLinkCard';
import TabSection from '../components/TabSection';
import QRScanner from '../components/QRScanner';

const BinCollection = () => {
  const [activeTab, setActiveTab] = useState('Collect');
  const [isScanning, setIsScanning] = useState(false); // State to manage scanning mode
  const [binData, setBinData] = useState(null); // State to store scanned bin data
  const navigate = useNavigate(); // Hook to handle navigation

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleContinue = () => {
    setIsScanning(true); // Activate scanning mode on continue button click
  };

  const handleScanComplete = (data) => {
    setBinData(data);
    setIsScanning(false); // Exit scanning mode after scanning
    navigate(`/bin-details/${data}`); // Navigate to the page with bin details based on scanned data
  };

  return (
    <div className="bin-collection-page flex flex-col min-h-screen">
      <header className="page-header flex justify-between items-center p-4 bg-white shadow-md rounded-b-lg">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Bins..."
            className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="search-button text-2xl text-blue-500 hover:text-blue-700 transition">
            🔍
          </button>
        </div>
      </header>

      <div className="fixed top-14 left-0 right-0 z-10">
        <TabSection activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      <div className="pt-28 pb-4"></div>
      <QRLinkCard />

      {isScanning ? (
        <QRScanner
          onScanComplete={handleScanComplete} // Handle the scan complete event
          onClose={() => setIsScanning(false)}
        />
      ) : (
        <div className="button-container flex justify-center mb-4">
          <button
            className="continue-button w-3/4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      )}

      <TabBar />
    </div>
  );
};

export default BinCollection;
