import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = ({ setDate }) => {
  const [startDate, setStartDate] = useState(null);

  return (
    <div className="w-full">
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          setDate(date);
        }}
        placeholderText="Select a date"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
      />
    </div>
  );
};

export default DateSelector;
