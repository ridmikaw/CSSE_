import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BinList = ({ userId }) => {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await axios.get(`/api/bins/${userId}`);
        setBins(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bins');
        setLoading(false);
      }
    };

    fetchBins();
  }, [userId]);

  if (loading) {
    return <p>Loading bins...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bin-list bg-white shadow-md rounded-lg p-4 mx-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Bins</h3>
      <ul className="bin-items divide-y divide-gray-200">
        {bins.map((bin) => (
          <li key={bin._id} className="py-3 flex justify-between items-center">
            <div className="bin-details">
              <p className="text-gray-700 font-medium">{bin.binType}</p>
              <p className="text-sm text-gray-500">{bin.location}</p>
            </div>
            <img src={bin.qrCode} alt="QR Code" className="w-12 h-12" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BinList;
