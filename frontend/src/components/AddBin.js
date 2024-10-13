import React, { useState } from 'react';

const AddBin = ({ onAddBin }) => {
  const [binType, setBinType] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call parent function to add bin
    onAddBin({ binType, location });
    // Reset form fields
    setBinType('');
    setLocation('');
  };

  return (
    <div className="add-bin-form bg-white shadow-md rounded-lg p-4 mx-4 mt-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Add a New Bin
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="binType"
            className="block text-sm font-medium text-gray-700"
          >
            Bin Type
          </label>
          <input
            id="binType"
            type="text"
            value={binType}
            onChange={(e) => setBinType(e.target.value)}
            className="input-field mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="add-button w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
        >
          Add Bin
        </button>
      </form>
    </div>
  );
};

export default AddBin;
