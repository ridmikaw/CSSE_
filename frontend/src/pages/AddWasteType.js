import React, { useState } from 'react';
import { useAuth } from '../middleware/AuthContext';

export default function AddWasteType() {


  const [typeName, setTypeName] = useState('');
  const [rate, setRate] = useState('');
  const [description, setDescription] = useState('');
  const [refundableType, setRefundableType] = useState(false);
  const [basedOnWeight, setBasedOnWeight] = useState(false);
  const { user, loading } = useAuth();
  const userId = user?._id

  const handleSubmit = async (e) => {
    e.preventDefault();

    const wasteTypeData = {
      userId,  // Add userId
      typeName,
      rate,
      description,
      refundableType,
      basedOnWeight,
    };

    try {
      const response = await fetch('http://localhost:4000/api/add-waste-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wasteTypeData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Waste Type added successfully!');
      } else {
        console.error(result);
        alert('Failed to add Waste Type');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error occurred while adding Waste Type');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center font-sans">
    <nav className="w-full bg-blue-600 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold text-white">Waste Type Management</h1>
      </div>
    </nav>

    <form onSubmit={handleSubmit} className="m-8 bg-white rounded-lg shadow-lg p-10 w-full max-w-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add a Waste Type</h2>

      <div className="mb-6">
        <label className="block text-gray-600 text-lg mb-2">Type Name</label>
        <input
          type="text"
          placeholder="Enter the waste type name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 text-lg mb-2">Rate (LKR)</label>
        <input
          type="number"
          placeholder="Add rate"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 text-lg mb-2">Description</label>
        <textarea
          placeholder="Enter a description"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="flex items-center mb-6">
        <label className="block text-gray-600 text-lg mr-4">Refundable type</label>
        <input
          type="checkbox"
          checked={refundableType}
          onChange={() => setRefundableType(!refundableType)}
        />
      </div>

      <div className="flex items-center mb-8">
        <label className="block text-gray-600 text-lg mr-4">Based on weight</label>
        <input
          type="checkbox"
          checked={basedOnWeight}
          onChange={() => setBasedOnWeight(!basedOnWeight)}
        />
      </div>

      <div className="flex justify-between">
        <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg">Back</button>
        <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg">Add Type</button>
      </div>
    </form>
  </div>
  );
}
