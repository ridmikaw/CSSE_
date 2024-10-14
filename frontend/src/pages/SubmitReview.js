import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitReview = () => {
  const [review, setReview] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    // Add review submission logic here (e.g., save to database)
    // Assuming success, you can navigate back to the bins page
    console.log('Review submitted:', review); // Debugging output

    // Reset the review input
    setReview('');
    navigate('/bins'); // Navigate back to bins page after submitting
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {error}
        </div>
      )}
      <form onSubmit={handleReviewSubmit} className="space-y-4">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows="4"
          className="w-full p-2 border rounded-md"
          placeholder="Write your review here..."
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default SubmitReview;
