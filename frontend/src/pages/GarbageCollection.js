import React, { useEffect, useRef, useState } from 'react';
import TabSection from '../components/TabSection';
import Modal from '../components/PaymentDialog'; // Import the Modal component
import TabBar from '../components/TabBar';
import { Link } from 'react-router-dom';

export default function GarbageCollection() {
  const [activeTab, setActiveTab] = useState('WasteCollection');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null); // State to hold selected payment details
  const [isMenuOpen, setMenuOpen] = useState(false); //nav
  const dropdownRef = useRef(null);
   // Toggle the profile dropdown menu
   const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
   // Close the dropdown menu when clicking outside of it
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false); // Close the menu if clicking outside
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Sample payment data to display
  const payments = [
    { status: 'Completed', id: '4FDW-356', date: '04th July 2024', statusColor: 'text-green-500' },
    { status: 'Cancelled', id: 'J9EF-345', date: '12th July 2024', statusColor: 'text-red-500' },
    { status: 'Completed', id: 'RE1H-876', date: '31st June 2024', statusColor: 'text-green-500' },
  ];

  return (
    <div className="payment-page flex flex-col min-h-screen bg-gray-50 p-4">
       {/* Header Section */}
       <header className="fixed top-0 left-0 right-0 z-20 page-header flex justify-between items-center p-4 bg-white ">
        <h2 className="text-xl font-bold">Waste Collection</h2>

        {/* Profile Icon and Dropdown */}
        <div className="relative hidden md:block"> {/* Hide on small screens */}
          <button
            className="profile-button text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            {/* Profile icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A10.969 10.969 0 0112 15c2.576 0 4.927.896 6.879 2.404M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2a10 10 0 110 20 10 10 0 010-20z"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-30">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveTab('Collections')}>Collection</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveTab('Request')}>Request</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveTab('Profile')}>Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveTab('Payments')}>Payments</li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Tab Section */}
      <div className="fixed top-14 left-0 right-0 z-10">
        <TabSection activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Spacer for header and tab section */}
      <div className="pt-28"></div>

      {/* Sort and Request Buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2 items-center">
          <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg flex items-center">
            <span className="mr-2">Sort</span> 🔽
          </button>
        </div>
        <Link to={'/specialwastecollection'}><button  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
          + Request
        </button></Link>
      </div>

      {/* Payments List Section */}
      <div className="space-y-4">
        {payments.map((payment, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg"
          >
            <div className="flex flex-col">
              <span className={`${payment.statusColor} font-bold`}>{payment.status}</span>
              <span className="text-xl font-semibold">{payment.id}</span>
            </div>
            <div className="text-right text-sm text-gray-500">
              <span>Requested Date</span>
              <br />
              <span>{payment.date}</span>
            </div>
          </div>
        ))}
         <div className="md:hidden block">
        <TabBar />
      </div>
      </div>
    </div>
  );
}
