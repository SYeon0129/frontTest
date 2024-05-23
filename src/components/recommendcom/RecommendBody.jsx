import React, { useState, useEffect } from 'react';
import PollutionMap from './PollutionMap';
import Searchcom from './Searchcom';
import WeatherTable from './WeatherTable';

const RecommendBody = ({ selectedMainStartDate, selectedMainEndDate }) => {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const [selectedStartDate, setSelectedStartDate] = useState(selectedMainStartDate || today);
  const [selectedEndDate, setSelectedEndDate] = useState(selectedMainEndDate || nextWeek);

  const handleDateChange = (date, label) => {
    if (label === 'selectedStartDate') {
      setSelectedStartDate(date);
    } else if (label === 'selectedEndDate') {
      setSelectedEndDate(date);
    }
  };

  useEffect(() => {
    // 확인용 로그
    console.log('Selected Start Date:', selectedStartDate);
    console.log('Selected End Date:', selectedEndDate);
  }, [selectedStartDate, selectedEndDate]);

  return (
    <div>
      {/* 날짜 선택 */}
      <Searchcom
        onDateChange={handleDateChange}
        initialStartDate={selectedStartDate}
        initialEndDate={selectedEndDate}
      />
      <div className="mx-auto max-w-2xl p-5 lg:max-w-7xl lg:px-8 grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-10">
        {/* 날씨 */}
        <div>
          <WeatherTable selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate} />
        </div>
        {/* 지도 */}
        <div>
          <PollutionMap selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate} />
        </div>
      </div>
    </div>
  );
};

export default RecommendBody;