import React, { useState } from 'react';
import { Typography } from "@material-tailwind/react";
import DateSelection from '../recommendcom/DateSelection';
import { Link } from 'react-router-dom';
import './Search.css';

const Search = ({ onDateChange }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleDateChange = (date, label) => {
    if (label === "selectedStartDate") {
      setSelectedStartDate(date);
    } else if (label === "selectedEndDate") {
      setSelectedEndDate(date);
    }
    onDateChange(date, label);
  };

  return (
    <div className="border-2 border-white rounded-md shadow w-1/3 mx-auto grid grid-cols-6 p-5 relative z-50 your-element text-white gap-0">
      <div className="col-span-2 z-0 border-2 rounded-md p-2 text-center homeSerch">
        <DateSelection onSelectDate={handleDateChange} label="selectedStartDate" />
      </div>
      <Typography
        className="col-1 text-center"
        variant="h3"
        color="white"
      >
        ~
      
      </Typography>
      <div className="col-span-2 z-0 border-2 p-2 rounded-md text-center homeSerch" >
      {/* <div className="col-span-2 z-0 border-2 p-2 rounded-md text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}> */}
        <DateSelection onSelectDate={handleDateChange} label="selectedEndDate" />
      </div>

    <div>
      <Link to={`/Recommend/${selectedStartDate}/${selectedEndDate}`}>
        <button
        className='text-center text-white border-2 rounded-md p-2 border-white'>
          검색
        </button>
      </Link>
      </div>
    </div>
  );
};

export default Search;