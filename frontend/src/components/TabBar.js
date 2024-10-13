import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEnvelope, FaUser, FaCreditCard } from 'react-icons/fa';

const TabBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Collection'); // Default active tab

  const tabs = [
    { name: 'Collection', icon: <FaTrash />, path: '/collection' },
    { name: 'Requests', icon: <FaEnvelope />, path: '/requests' },
    { name: 'Profile', icon: <FaUser />, path: '/profile' },
    { name: 'Payments', icon: <FaCreditCard />, path: '/payments' },
  ];

  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName); // Update active tab
    navigate(path); // Navigate to the corresponding path
  };

  return (
    <div className="tab-bar flex justify-around items-center bg-gray-800 text-white py-3 shadow-lg">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className="tab-item flex flex-col items-center cursor-pointer transition-all duration-300"
          onClick={() => handleTabClick(tab.name, tab.path)}
        >
          {/* Change icon color based on active state */}
          {React.cloneElement(tab.icon, {
            className: `text-xl md:text-3xl mb-1 ${
              activeTab === tab.name ? 'text-blue-500' : 'text-gray-300'
            }`,
          })}
          <span
            className={`text-sm md:text-base ${
              activeTab === tab.name ? 'text-blue-500' : 'text-gray-300'
            }`}
          >
            {tab.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
