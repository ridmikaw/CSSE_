import QRCode from 'qrcode';

// Generate QR code
const generateQRCode = async (data) => {
  try {
    return await QRCode.toDataURL(data);
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw new Error('QR code generation failed');
  }
};

export default generateQRCode;
