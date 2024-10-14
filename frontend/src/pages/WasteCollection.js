import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Add Axios for API requests
import MapComponent from '../components/MapComponent';
import DateSelector from '../components/DateSelector';
import { useAuth } from '../middleware/AuthContext';
import API_ENDPOINTS from '../config';

const SpeWasteCollection = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState('');
  const [bins, setBins] = useState([]);
  const [selectedBinId, setSelectedBinId] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const { user, loading } = useAuth();

  console.log("DDDEE",user._id);
  

  

  
  useEffect(() => {
    if (loading || !user) {
        return; // Prevent fetching bins if user is not available
      }
    
    const fetchBins = async () => {
      const token = localStorage.getItem('token');
      const userId = user._id; // Get the user ID from the `useAuth` hook
      try {
        // Send user ID as part of the path
        const response = await axios.get(`http://localhost:4000/api/binsByUserId/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        });
        setBins(response.data); // Set the bins state
      } catch (error) {
        console.error('Error fetching bins:', error);
      }
    };
  
    fetchBins();
  }, [user]);
  

  const handleBinSelect = (event) => {
    const binId = event.target.value;
    setSelectedBinId(binId);

    // Find the selected bin's location and update the map
    const selectedBin = bins.find((bin) => bin._id === binId);
    if (selectedBin) {
      setSelectedLocation({
        lat: selectedBin.location.lat,
        lng: selectedBin.location.lng,
      });
    }
  };

  const handleRequest = () => {
    console.log('Location:', selectedLocation);
    console.log('Date:', selectedDate);
    console.log('Notes:', notes);
    // Handle your form submission logic here
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Waste Bin Collection Request</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map section */}
        <div className="lg:h-[500px] h-[300px] flex flex-col justify-start">
          <h2 className="text-lg font-semibold mb-4">Pin Bin Location</h2>
          <MapComponent setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation} />
        </div>

        {/* Form section */}
        <div className="flex flex-col space-y-6">
          {/* Bin Selector */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold">Select Bin</h2>
            <select
              value={selectedBinId}
              onChange={handleBinSelect}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            >
              <option value="">Select a Bin</option>
              {bins.map((bin) => (
                <option key={bin._id} value={bin._id}>
                  Bin ID: {bin._id}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold">Request Date</h2>
            <DateSelector setDate={setSelectedDate} />
          </div>

          {/* Notes */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold">Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special notes..."
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleRequest}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeWasteCollection;
