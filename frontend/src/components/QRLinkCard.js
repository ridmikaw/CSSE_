import React from 'react';
import { FaQrcode } from 'react-icons/fa';

const QRLinkCard = () => {
  return (
    <div className="qr-link-card flex flex-col items-center justify-between  text-white p-6 rounded-lg  h-100vh">
      <FaQrcode className="text-4xl md:text-5xl text-blue-400 mb-4" />
      <h3 className="text-lg font-semibold mb-2">Link with a Bin</h3>
      <p className="text-sm text-gray-300 mb-6 text-center">
        Scan QR to proceed with a bin collection
      </p>
     
    </div>
  );
};

export default QRLinkCard;
