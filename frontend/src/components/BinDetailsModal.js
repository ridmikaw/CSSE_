import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const BinDetailsModal = ({ bin, onClose }) => {
  const qrCodeRef = useRef();

  const handleDownloadQRCode = () => {
    const canvas = qrCodeRef.current.querySelector('canvas');
    const imageUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `QRCode_${bin._id}.png`;
    link.click();
  };

  console.log(bin);

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="modal-content bg-white rounded-lg p-6 max-w-md w-full mx-auto">
        <h2 className="text-lg font-semibold mb-4">{bin.binType} Details</h2>
        <p className="text-sm">
          <strong>Location:</strong> {bin.location.lat}, {bin.location.lng}
        </p>
        <p className="text-sm">
          <strong>Status:</strong> {bin.isVerified ? 'Verified' : 'Pending'}
        </p>
        {bin.isVerified && (
          <div className="mt-4">
            <strong>QR Code:</strong>
            <div ref={qrCodeRef} className="flex justify-center mt-2">
              <QRCodeCanvas value={`https://example.com/bins/${bin._id}`} />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="share-button bg-blue-500 text-white px-3 py-2 rounded w-full"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `http://localhost:3000//bins/${bin._id}`
                  )
                }
              >
                Share QR Code
              </button>
              <button
                className="download-button bg-green-500 text-white px-3 py-2 rounded w-full"
                onClick={handleDownloadQRCode}
              >
                Download QR Code
              </button>
            </div>
          </div>
        )}
        <button
          className="close-button mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BinDetailsModal;
