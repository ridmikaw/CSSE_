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
      {/* Header Section */}
      <header className="fixed top-0 left-0 right-0 z-10 page-header flex justify-between items-center p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold">Payments</h2>
        <button className="search-button text-2xl">🔍</button>
      </header>

      {/* Tab Section */}
      <div className="fixed top-14 left-0 right-0 z-10">
        <TabSection activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Spacer for header and tab section */}
      <div className="pt-28 pb-4"></div>
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
