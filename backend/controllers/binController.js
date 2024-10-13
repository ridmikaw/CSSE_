import Bin from '../models/Bin.js';
import generateQRCode from '../utils/qrCodeGenerator.js';

// Add a new bin
export const addBin = async (req, res) => {
  try {
    const { ownerId, binType, location } = req.body;

    const newBin = new Bin({ ownerId, binType, location });
    await newBin.save();

    res
      .status(201)
      .json({ message: 'Bin added. Awaiting verification.', bin: newBin });
  } catch (err) {
    res.status(500).json({ message: 'Error adding bin', error: err.message });
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

    // Generate a unique QR code for the bin
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

// Get bin details
export const getBin = async (req, res) => {
  try {
    const { binId } = req.params;
    const bin = await Bin.findById(binId);

    if (!bin) {
      return res.status(404).json({ message: 'Bin not found' });
    }

    res.status(200).json(bin);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching bin details', error: err.message });
  }
};
