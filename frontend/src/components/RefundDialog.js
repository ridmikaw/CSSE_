// RefundDialog.js
import React, { useState } from 'react';
import axios from 'axios';

export default function RefundDialog({ isOpen, onClose, onSubmit, userId }) {
  const [refundAmount, setRefundAmount] = useState('');
  const [refundNote, setRefundNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const refundData = {
      amount: refundAmount,
      note: refundNote,
      userId, // Pass the user ID as part of the refund data
    };

    try {
      const response = await axios.post('http://localhost:4000/api/refund', refundData);
      console.log('Refund saved:', response.data);
      onSubmit(refundData);
    } catch (error) {
      console.error('Error submitting refund:', error);
    }

    setRefundAmount('');
    setRefundNote('');
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Request Refund</h2>
        <form onSubmit={handleSubmit}>
          {/* Refund Amount */}
          <div className="mb-4">
            <label className="block text-gray-600 text-lg mb-2">Refund Amount (LKR)</label>
            <input
              type="number"
              placeholder="Enter refund amount"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              required
            />
          </div>

          {/* Refund Note */}
          <div className="mb-6">
            <label className="block text-gray-600 text-lg mb-2">Note</label>
            <textarea
              placeholder="Enter a note"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={refundNote}
              onChange={(e) => setRefundNote(e.target.value)}
              rows={3}
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
            >
              Submit Refund
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
