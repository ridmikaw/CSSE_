import React from 'react';

export default function PaymentDialog({ isOpen, onClose, paymentDetails }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/3 p-6 font-sans">
                <div className="text-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-700">Payment Total</h2>
                    <p className="text-3xl font-bold text-gray-900">{paymentDetails.totalAmount} LKR</p>
                </div>

                <div className="mb-6 text-gray-600 space-y-2">
                    <p><span className="font-medium text-gray-700">Date:</span> {paymentDetails.date}</p>
                    <p><span className="font-medium text-gray-700">Total Waste Production:</span> {paymentDetails.waste} Kg</p>
                    <p><span className="font-medium text-gray-700">Non-Refundable Amount:</span> {paymentDetails.nonRefundable} LKR</p>
                    <p><span className="font-medium text-gray-700">Refundable Amount:</span> {paymentDetails.refundable} LKR</p>
                    <p className="font-semibold text-gray-800 mt-2 text-lg">Total Payment: {paymentDetails.totalPayment} LKR</p>
                </div>

                <div className="mb-6">
                    <select className="w-full p-3 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        <option>Mcard xxxx xxxx xxxx 1234</option>
                        <option>Visa xxxx xxxx xxxx 9876</option>
                    </select>
                    <button className="text-blue-500 mt-2 hover:underline transition-all">+ Add new card</button>
                </div>
                
                <div className="text-center">
                    <button
                        className="bg-blue-500 text-white w-full py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={onClose}
                    >
                        Make Payment
                    </button>
                </div>
            </div>
        </div>
    );
}
