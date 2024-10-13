import React, { useState } from 'react';

export default function AddWasteType() {
  const [refundableType, setRefundableType] = useState(false);
  const [basedOnWeight, setBasedOnWeight] = useState(false);

  return (
    <div className=" min-h-screen bg-gray-50 flex items-center justify-center font-sans">
      <div className="m-8   bg-white rounded-lg shadow-lg p-10 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add a Waste Type</h2>

        {/* Type Name Input */}
        <div className="mb-6">
          <label className="block text-gray-600 text-lg mb-2">Type Name</label>
          <input
            type="text"
            placeholder="Enter the waste type name (e.g. Plastic, E-waste)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Rate Input */}
        <div className="mb-6">
          <label className="block text-gray-600 text-lg mb-2">Rate (LKR)</label>
          <input
            type="text"
            placeholder="Add rate"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label className="block text-gray-600 text-lg mb-2">Description</label>
          <textarea
            placeholder="Enter a description for the waste type"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
        </div>

        {/* Refundable Type Switch */}
        <div className="flex items-center mb-6">
          <label className="block text-gray-600 text-lg mr-4">Refundable type</label>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={refundableType}
              onChange={() => setRefundableType(!refundableType)} 
            />
            <span className="slider round"></span>
          </label>
        </div>

        {/* Based on Weight Switch */}
        <div className="flex items-center mb-8">
          <label className="block text-gray-600 text-lg mr-4">Based on weight</label>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={basedOnWeight}
              onChange={() => setBasedOnWeight(!basedOnWeight)} 
            />
            <span className="slider round"></span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-shadow">Back</button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-shadow">Add Type</button>
        </div>
      </div>
    </div>
  );
}
