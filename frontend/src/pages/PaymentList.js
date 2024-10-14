import React, { useState } from 'react';
import TabSection from '../components/TabSection';
import TabBar from '../components/TabBar';
import Modal from '../components/PaymentDialog'; // Import the Modal component

export default function PaymentList() {
  const [activeTab, setActiveTab] = useState('Payments');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null); // State to hold selected payment details

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Function to handle Pay Now button click
  const handlePayNowClick = (payment) => {
    setSelectedPayment(payment);
    setModalOpen(true); // Open the modal
  };

  return (
    <div className="payment-page flex flex-col min-h-screen bg-gray-50">
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
      <div className="pt-28"></div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-lg mx-auto m-5 mt-6">
        {/* Pending Payment Card */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-4 mx-4 sm:mx-0 flex justify-between items-center">
          <div>
            <h3 className="text-gray-800 text-lg font-semibold">LKR 1,105.00</h3>
            <p className="text-gray-500">Pending Payment</p>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            onClick={() => handlePayNowClick({ amount: 'LKR 1,105.00', status: 'Pending', date: 'N/A' })} // Pass payment details
          >
            Pay Now
          </button>
        </div>

        {/* Completed Payment Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-4 mx-4 sm:mx-0">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-800 text-lg font-semibold">LKR 1,245.00</h3>
            <p className="text-gray-400 text-sm">Payment Date</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-green-500 font-semibold">Completed</p>
            <p className="text-gray-500 text-sm">04th July 2024</p>
          </div>
        </div>

        {/* Completed Payment Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-4 mx-4 sm:mx-0">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-800 text-lg font-semibold">LKR 1,893.25</h3>
            <p className="text-gray-400 text-sm">Requested Date</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-green-500 font-semibold">Completed</p>
            <p className="text-gray-500 text-sm">01st August 2024</p>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="small-spacer py-4"></div>

      {/* Bottom Tab Bar */}
      <TabBar />

      {/* Modal for payment details */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        paymentDetails={selectedPayment} 
      />
    </div>
  );
}
