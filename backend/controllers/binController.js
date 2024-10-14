// controllers/binController.js
import Bin from '../models/Bin.js';
import generateQRCode from '../utils/qrCodeGenerator.js';

// Add a new bin
export const addBin = async (req, res) => {
  try {
    const { ownerId, binType, location } = req.body;

    // Validate input
    if (!ownerId || !binType || !location || !location.lat || !location.lng) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create new bin
    const newBin = new Bin({ ownerId, binType, location });

    // Save to the database
    await newBin.save();

    res.status(201).json({ message: 'Bin added successfully', bin: newBin });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

// Verify bin and generate QR code
export const verifyBin = async (req, res) => {
  try {
    const { binId } = req.params;
    const bin = await Bin.findById(binId);

    if (!bin) {
      return res.status(404).json({ message: 'Bin not found' });
    }

    if (bin.isVerified) {
      return res.status(400).json({ message: 'Bin is already verified' });
    }

    const qrData = `${process.env.BASE_URL}/bins/${bin._id}`;
    const qrCode = await generateQRCode(qrData);

    bin.isVerified = true;
    bin.qrCode = qrCode;
    await bin.save();

    res
      .status(200)
      .json({ message: 'Bin verified and QR code generated', bin });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error verifying bin', error: err.message });
  }
};

// Get bins for a specific user
export const getUserBins = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from the authenticated user
    const bins = await Bin.find({ ownerId: userId });

    if (!bins.length) {
      return res.status(404).json({ message: 'No bins found for this user' });
    }

    res.status(200).json(bins);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching user bins', error: err.message });
  }
};
// Get all bins
export const getAllBins = async (req, res) => {
  try {
    const bins = await Bin.find(); // Retrieve all bins from the database

    if (!bins.length) {
      return res.status(404).json({ message: 'No bins found' });
    }

    res.status(200).json(bins); // Return the bins
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching bins', error: err.message });
  }
};
