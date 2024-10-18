import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TabBar from '../components/TabBar.js';
import TabSection from '../components/TabSection.js';
import API_ENDPOINTS from '../config.js';
import { useAuth } from '../middleware/AuthContext.js';
import BinDetailsModal from '../components/BinDetailsModal.js';

const VerifyBinPage = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [bins, setBins] = useState([]);
  const [filteredBins, setFilteredBins] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBin, setSelectedBin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVerified, setShowVerified] = useState(false); // New state for toggle
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchBins = async () => {
      if (loading) return; // Wait for loading to complete

      if (!user) {
        setError('User not authenticated. Please log in.');
        navigate('/signin');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_ENDPOINTS.GET_BINS, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBins(response.data);
        setFilteredBins(response.data);
      } catch (error) {
        console.error('Error fetching bins:', error);
        setError('Failed to fetch bins. Please try again later.');
      }
    };

    fetchBins();
  }, [user, loading, navigate]);

  useEffect(() => {
    const filtered = bins.filter((bin) =>
      bin.binType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBins(filtered);
  }, [searchTerm, bins]);

  useEffect(() => {
    const filtered = bins.filter((bin) =>
      showVerified ? bin.isVerified : !bin.isVerified
    );
    setFilteredBins(filtered);
  }, [showVerified, bins]);

  const handleSort = () => {
    const sortedBins = [...filteredBins].sort((a, b) =>
      a.binType.localeCompare(b.binType)
    );
    setFilteredBins(sortedBins);
  };

  const handleVerify = async (binId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_ENDPOINTS.GET_BINS}/${binId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Bin verified successfully');
      setBins(bins.map((bin) => (bin._id === binId ? response.data.bin : bin)));
    } catch (error) {
      console.error('Error verifying bin:', error);
      setError('Failed to verify bin.');
    }
  };

  const handleReject = async (binId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_ENDPOINTS.GET_BINS}/${binId}/reject`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Bin rejected successfully');
      setBins(bins.filter((bin) => bin._id !== binId));
    } catch (error) {
      console.error('Error rejecting bin:', error);
      setError('Failed to reject bin.');
    }
  };

  const openModal = (bin) => {
    setSelectedBin(bin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBin(null);
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
            className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
          <button className="search-button text-2xl text-blue-500 hover:text-blue-700 transition">
            🔍
          </button>
        </div>

        <div className="flex items-center">
          <label htmlFor="toggle-switch" className="mr-2">
            Show Verified
          </label>
          <input
            id="toggle-switch"
            type="checkbox"
            checked={showVerified}
            onChange={() => setShowVerified(!showVerified)}
            className="toggle-checkbox"
          />
        </div>
      </header>

      <TabSection activeTab={activeTab} onTabChange={setActiveTab} />

      {loading ? (
        <div className="flex justify-center items-center h-full mt-4">
          <span className="text-lg text-gray-500">Loading bins...</span>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-full mt-4 text-red-500">
          {error}
        </div>
      ) : (
        <div className="bins-list px-4 py-2 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBins.map((bin) => (
              <div
                key={bin._id}
                className="bin-item p-4 bg-white my-2 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
                onClick={() => openModal(bin)}
              >
                <p className="text-lg font-semibold">
                  <strong>Bin Name:</strong> {bin.binType}
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> {bin.location.lat},{' '}
                  {bin.location.lng}
                </p>
                <p className="text-gray-600">
                  <strong>Status:</strong>{' '}
                  {bin.isVerified ? 'Verified' : 'Pending'}
                </p>
                <div className="flex mt-2">
                  <button
                    className="verify-button bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal opening
                      handleVerify(bin._id);
                    }}
                    disabled={bin.isVerified}
                  >
                    Verify
                  </button>
                  <button
                    className="reject-button bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition ml-2"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal opening
                      handleReject(bin._id);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <BinDetailsModal bin={selectedBin} onClose={closeModal} />
      )}

      <TabBar />
    </div>
  );
};

export default VerifyBinPage;
