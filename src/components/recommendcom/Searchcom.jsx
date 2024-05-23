import React from 'react';
import { Typography } from '@material-tailwind/react';
import DateSelection from './DateSelection';

const Searchcom = ({ onDateChange, initialStartDate, initialEndDate }) => {
  const handleDateChange = (date, label) => {
    onDateChange(date, label);
  };

  return (
    <div className="bg-white rounded-md shadow w-1/3 mx-auto grid grid-cols-5 -mt-10 p-5 relative z-50 your-element">
      <div className="col-span-2 z-0 border p-2 text-center">
        <DateSelection onSelectDate={handleDateChange} label="selectedStartDate" defaultDate={initialStartDate} />
      </div>
      <Typography className="col-1 text-center" variant="h3" color="black">
        ~
      </Typography>
      <div className="col-span-2 z-0 border p-2 text-center">
        <DateSelection onSelectDate={handleDateChange} label="selectedEndDate" defaultDate={initialEndDate} />
      </div>
    </div>
  );
};

export default Searchcom;