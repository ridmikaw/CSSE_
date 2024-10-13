import React from 'react';
import { useNavigate } from 'react-router-dom';

const TabSection = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const tabs = ['Home', 'Bin', 'Collections', 'Payments'];

  const handleTabChange = (tab) => {
    onTabChange(tab);
    // Change the URL based on the selected tab\
    if(tab === 'Home'){
      navigate('/home'); 
    }
    else if (tab === 'Bin') {
      navigate('/bin'); // Update the URL for the 'Navigate' tab
    } else if (tab === 'Collections') {
      navigate('/collections'); // Update the URL for the 'Collect' tab
    } else if (tab === 'Payments') {
      navigate('/payments'); // Update the URL for the 'Finished' tab
    }
  };

  return (
    <div className="tab-section flex justify-center items-center gap-2 p-2 bg-[#F8F9FE] rounded-lg shadow-md m-2">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`tab py-2 px-4 rounded-lg cursor-pointer transition-all duration-300 ${
            activeTab === tab
              ? 'bg-[#FFFFFF] shadow-md'
              : 'hover:bg-gray-200 active:bg-gray-300'
          }`}
          onClick={() => handleTabChange(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default TabSection;
