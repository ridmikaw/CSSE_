// src/pages/BinsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BinList from '../components/BinList';
import API_ENDPOINTS from '../config';

const BinsPage = () => {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bins from the API when the component mounts
  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GET_BINS);
        setBins(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bins:', error);
        setLoading(false);
      }
    };

    fetchBins();
  }, []);

  return (
    <div className="bins-page flex flex-col min-h-screen bg-gray-100">
      <header className="page-header p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Bins</h2>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">Loading bins...</p>
        </div>
      ) : (
        <BinList bins={bins} />
      )}
    </div>
  );
};

export default BinsPage;
