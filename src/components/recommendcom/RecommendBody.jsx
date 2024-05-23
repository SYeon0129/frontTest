import React, { useState } from 'react';
import PollutionMap from './RecommendMap';
import Searchcom from './Searchcom';
import WeatherTable from './WeatherTable';

const RecommendBody = ({selectedMainStartDate, selectedMainEndDate}) => {
  // selectedMainStartDate가 null인 경우에만 오늘 날짜로 설정
  const [selectedStartDate, setSelectedStartDate] = useState(selectedMainStartDate || new Date());

  // selectedMainEndDate가 null인 경우에만 오늘 날짜로부터 7일 후로 설정
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const [selectedEndDate, setSelectedEndDate] = useState(selectedMainEndDate || nextWeek);

  const handleDateChange = (date, label) => {
      if (label === "selectedStartDate") {
          setSelectedStartDate(date);
      } else if (label === "selectedEndDate") {
          setSelectedEndDate(date);
      }
  };
  console.log(selectedStartDate);

  return (
    <div>
      {/* 날짜선택 */}
      <Searchcom onDateChange={handleDateChange} />
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