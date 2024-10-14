import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TabBar from '../components/TabBar';
import TabSection from '../components/TabSection';
import API_ENDPOINTS from '../config';
import { useAuth } from '../middleware/AuthContext'; // Ensure this path is correct

const BinPage = () => {
  const [activeTab, setActiveTab] = useState('Bins');
  const [bins, setBins] = useState([]);
  const [filteredBins, setFilteredBins] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // Get user and loading state from the context

  useEffect(() => {
    const fetchBins = async () => {
      console.log('User object:', user); // Debugging statement to check user object

      // Check for user authentication
      if (!user) {
        setError('User not authenticated. Please log in.');
        navigate('/signin');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          navigate('/signin');
          return;
        }

        // Fetch all bins from the API
        const response = await axios.get(API_ENDPOINTS.GET_BINS, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBins(response.data);
        setFilteredBins(response.data); // Initialize filtered bins
      } catch (error) {
        console.error('Error fetching bins:', error);
        setError('Failed to fetch bins. Please try again later.');
      }
    };

    fetchBins();
  }, [user, navigate]);

  useEffect(() => {
    // Filter bins based on search term
    const filtered = bins.filter((bin) =>
      bin.binType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBins(filtered);
  }, [searchTerm, bins]);

  const handleSort = () => {
    const sortedBins = [...filteredBins].sort((a, b) =>
      a.binType.localeCompare(b.binType)
    );
    setFilteredBins(sortedBins);
  };

  const handleAddBin = () => {
    // Logic to navigate to the add bin page or open a modal
    navigate('/add-bin'); // Example route, adjust according to your app
  };

  return (
    <div className="bin-collection-page flex flex-col min-h-screen bg-gray-50">
      <header className="page-header flex justify-between items-center p-4 bg-white shadow-md rounded-b-lg">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Bins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="search-button text-2xl text-blue-500 hover:text-blue-700 transition">
            🔍
          </button>
        </div>
      </header>

      <TabSection activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex justify-between p-4 bg-white shadow-md rounded-lg mt-4">
        <button
          className="add-bin-button bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={handleAddBin}
        >
          Add Bin
        </button>
        <button
          className="sort-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleSort}
        >
          Sort
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-full mt-4">
          <span className="text-lg text-gray-500">Loading bins...</span>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-full mt-4 text-red-500">
          {error}
        </div>
      ) : (
        <div className="bins-list px-4 py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBins.map((bin) => (
            <div
              key={bin._id}
              className="bin-item p-4 bg-white my-2 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              <p className="text-lg font-semibold">
                <strong>Bin Name:</strong> {bin.binType}
              </p>
              <p className="text-gray-600">
                <strong>Location:</strong> {bin.location.lat},{' '}
                {bin.location.lng}
              </p>
            </div>
          ))}
        </div>
      )}
      <TabBar />
    </div>
  );
};

export default BinPage;
