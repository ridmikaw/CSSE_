import React, { useState } from 'react';
import TabBar from '../components/TabBar';
import QRLinkCard from '../components/QRLinkCard';
import TabSection from '../components/TabSection'; // Import the new TabSection component

const BinCollection = () => {
  const [activeTab, setActiveTab] = useState('Collect'); // Set default active tab

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Update active tab on tab click
  };

  return (
    <div className="bin-collection-page flex flex-col min-h-screen">
      <header className="page-header">
        <h2>Bin Collection</h2>
        <button className="search-button">🔍</button>
      </header>
      {/* Use TabSection component here */}
      <TabSection activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="small-spacer"></div>
      <QRLinkCard />
      <TabBar />
      <div className="small-spacer"></div>{' '}
      {/* Smaller spacer to reduce space */}
      <div className="button-container flex justify-center mb-4">
        <button className="continue-button w-3/4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300">
          Continue
        </button>
      </div>
    </div>
  );
};

export default BinCollection;
