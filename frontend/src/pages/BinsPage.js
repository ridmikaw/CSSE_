import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TabBar from '../components/TabBar';
import TabSection from '../components/TabSection';
import API_ENDPOINTS from '../config';

const BinPage = () => {
  const [activeTab, setActiveTab] = useState('Bins');
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  const navigate = useNavigate();

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Fetch user details from local storage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user && user.id && user.name) {
          setUserName(user.name);
          setUserId(user.id);
        } else {
          console.warn('User data is invalid or missing required fields.');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.warn('No user data found in local storage.');
    }
  }, []);

  // Fetch bins data
  useEffect(() => {
    const fetchBins = async () => {
      if (!userId) return; // Only proceed if we have a userId

      try {
        const response = await axios.get(
          `${API_ENDPOINTS.GET_BINS}?userId=${userId}`
        );
        setBins(response.data);
      } catch (error) {
        console.error('Error fetching bins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBins();
  }, [userId]);

  // Function to navigate to AddBin page
  const handleGoToAddBin = () => {
    navigate('/add-bin');
  };

  return (
    <div className="bin-collection-page flex flex-col min-h-screen">
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
      <div className="small-spacer"></div>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading bins...</p>
        </div>
      ) : (
        <div className="bins-list px-4 py-2">
          {bins.map((bin) => (
            <div
              key={bin.id}
              className="bin-item p-4 bg-gray-100 my-2 rounded-lg shadow-sm"
            >
              <p>
                <strong>Bin Name:</strong> {bin.name}
              </p>
              <p>
                <strong>Location:</strong> {bin.location}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="small-spacer"></div>

      <div className="button-container flex justify-center mb-4">
        <button
          onClick={handleGoToAddBin}
          className="add-bin-button w-3/4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
        >
          Add New Bin
        </button>
      </div>

      <TabBar />
      <div className="small-spacer"></div>
    </div>
  );
};

export default BinPage;
