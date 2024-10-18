import React, { useState } from 'react';

export default function RefundPage() {
    const refundData = [
        { customerId: 'C1230', period: '08-01-2024 to 08-31-2024', refund: 'LKR 500', status: 'Pending' },
        { customerId: 'C1125', period: '08-01-2024 to 08-31-2024', refund: 'LKR 150', status: 'Pending' },
        { customerId: 'C0903', period: '08-01-2024 to 08-31-2024', refund: 'LKR 200', status: 'Pending' },
        { customerId: 'C0903', period: '08-01-2024 to 08-31-2024', refund: 'LKR 1000', status: 'Pending' },
        { customerId: 'C0903', period: '08-01-2024 to 08-31-2024', refund: 'LKR 800', status: 'Pending' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;

    // Calculate the index range for the rows to display
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = refundData.slice(indexOfFirstRow, indexOfLastRow);

    // Calculate total number of pages
    const totalPages = Math.ceil(refundData.length / rowsPerPage);

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
            {/* Navbar Section */}
            <nav className="w-full bg-blue-600 py-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center px-4">
                    {/* Title on the Left */}
                    <h1 className="text-2xl font-bold text-white">Pending Refunds</h1>
                    {/* Export Button on the Right */}
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition duration-200">
                        Export
                    </button>
                </div>
            </nav>

            {/* Table Section */}
            <div className="p-10">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Customer ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Refund Eligibility Period
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Refund
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.map((item, index) => (
                                    <tr key={index} className="bg-white">
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.customerId}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.period}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.refund}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <span className="text-yellow-500">{item.status}</span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <button className="bg-gray-200 text-blue-600 rounded-lg px-4 py-1 mr-2">
                                                View bank details
                                            </button>
                                            <button className="bg-gray-200 text-blue-600 rounded-lg px-4 py-1">
                                                Generate Report
                                            </button>
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
