import React, { useState } from 'react';

export default function WasteTypesTable() {
    const wasteData = [
        { type: "Plastic", rate: 220.25, payableType: "Non-Refundable", rateType: "Based on weight", totalWeight: -2500, color: 'text-red-500' },
        { type: "Organic", rate: 125.00, payableType: "Non-Refundable", rateType: "Based on weight", totalWeight: 6750, color: 'text-green-500' },
        { type: "Paper", rate: 125.00, payableType: "Non-Refundable", rateType: "Based on weight", totalWeight: -1243, color: 'text-red-500' },
        { type: "Electronic Waste", rate: -125.00, payableType: "Refundable", rateType: "Based on weight", totalWeight: -121, color: 'text-red-500' },
        { type: "Metal", rate: 300.00, payableType: "Non-Refundable", rateType: "Based on weight", totalWeight: 745, color: 'text-green-500' },
        { type: "Plastic", rate: 220.25, payableType: "Non-Refundable", rateType: "Based on weight", totalWeight: -2500, color: 'text-red-500' },
        { type: "Organic", rate: 125.00, payableType: "Non-Refundable", rateType: "Based on weight", totalWeight: 6750, color: 'text-green-500' },
        { type: "Paper", rate: 125.00, payableType: "Non-Refundable", rateType: "Based on weight", totalWeight: -1243, color: 'text-red-500' },
        { type: "Electronic Waste", rate: -125.00, payableType: "Refundable", rateType: "Based on weight", totalWeight: -121, color: 'text-red-500' },
        { type: "Plastic", rate: 220.25, payableType: "Non-Refundable", rateType: "Based on weight", totalWeight: -2500, color: 'text-red-500' },
        { type: "Organic", rate: 125.00, payableType: "Non-Refundable", rateType: "Based on weight", totalWeight: 6750, color: 'text-green-500' },
        { type: "Paper", rate: 125.00, payableType: "Non-Refundable", rateType: "Based on weight", totalWeight: -1243, color: 'text-red-500' },
        { type: "Electronic Waste", rate: -125.00, payableType: "Refundable", rateType: "Based on weight", totalWeight: -121, color: 'text-red-500' },
        { type: "Metal", rate: 300.00, payableType: "Non-Refundable", rateType: "Based on weight", totalWeight: 745, color: 'text-green-500' }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;

    // Calculate the index range for the rows to display
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = wasteData.slice(indexOfFirstRow, indexOfLastRow);

    // Calculate total number of pages
    const totalPages = Math.ceil(wasteData.length / rowsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
        <nav className="w-full bg-blue-600 py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Title on the Left */}
          <h1 className="text-2xl font-bold text-white">Waste Type Management</h1>
          {/* Home Button on the Right */}
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition duration-200">
            Home
          </button>
        </div>
      </nav>
        <div className="p-10">
             {/* Navbar Section */}
      
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Rate (LKR)
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Payable Type
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Rate Type
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Total Weight
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((item, index) => (
                                <tr key={index} className="bg-white">
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        {item.type}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        {item.rate.toFixed(2)}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        {item.payableType}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        {item.rateType}
                                    </td>
                                    <td className={`px-5 py-5 border-b border-gray-200 text-sm ${item.color}`}>
                                        {item.totalWeight > 0 ? `+${item.totalWeight} Kg` : `${item.totalWeight} Kg`}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <button className="bg-gray-200 text-blue-600 rounded-lg px-4 py-1">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-4 px-5">
                        <button 
                            onClick={handlePreviousPage} 
                            disabled={currentPage === 1}
                            className={`bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Previous
                        </button>
                        <div className="flex space-x-1">
                            {[...Array(totalPages).keys()].map(number => (
                                <button
                                    key={number}
                                    onClick={() => setCurrentPage(number + 1)}
                                    className={`px-3 py-1 rounded-lg ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    {number + 1}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={handleNextPage} 
                            disabled={currentPage === totalPages}
                            className={`bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-700 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
