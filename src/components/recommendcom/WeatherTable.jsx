import React, { useState, useEffect } from 'react';
import './WeatherTable.css';
import RegionMapping from '@/data/RegionMapping';
import WeatherIcon from '@/icon/WeatherIcons';
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import axios from 'axios';

function WeatherTable({ selectedStartDate, selectedEndDate }) {
  const [weatherData, setWeatherData] = useState([]);
  const [dates, setDates] = useState([]);
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    const formattedDates = getDates(selectedStartDate, selectedEndDate);
    setDates(formattedDates);
    if (selectedStartDate && selectedEndDate) {
      fetchWeatherData(selectedStartDate, selectedEndDate);
    }
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    if (weatherData.length > 0) {
      filterWeatherData();
    }
  }, [weatherData, dates]);

  const getDates = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const dates = [];
    while (startDate <= endDate) {
      dates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}.${day}`;
  };

  const formatRequestDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const orderedRegions = [
    "서울/경기",
    "충청도",
    "전라도",
    "강원도",
    "경상도",
    "제주도",
  ];

  const formattedStartDate = formatRequestDate(selectedStartDate);
  const formattedEndDate = formatRequestDate(selectedEndDate);

  const fetchWeatherData = async () => {
    try {
      console.log("초기 날짜 확인");
      console.log(formattedStartDate);
      console.log(formattedEndDate);

      const response = await axios.post('http://localhost:8080/api/weather/list', {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      console.log('Fetched Weather Data:', response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.error("날씨 데이터를 가져오는데 실패했습니다.", error);
    }
  };

  const filterWeatherData = () => {
    const filtered = weatherData.reduce((acc, curr) => {
      const region = RegionMapping[curr.cityId];
      const date = curr.date;
      const formattedDate = formatDate(date); 
      const startDate = new Date(formattedStartDate);
      const endDate = new Date(formattedEndDate);
      const currDate = new Date(date);

      if (currDate >= startDate && currDate <= endDate) {
        if (!acc[formattedDate]) {
          acc[formattedDate] = {};
        }
        acc[formattedDate][region] = {
          dayTemp: curr.dayTemp,
          pop: curr.pop,
          description: curr.description
        };
      }
      return acc;
    }, {});
    setFilteredData(filtered);
    console.log('Filtered Data:', filtered);
  };

  return (
    <div className="-z-10 max-h-[550px] overflow-y-scroll over">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 -z-10">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-2">Date</th>
            {orderedRegions.map((region, index) => (
              <th scope="col" className="py-3 px-6" key={index}>{region}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => {
            const formattedDate = formatDate(date);
            return (
              <tr key={formattedDate}>
                <td className="py-1 px-1">
                  <div className="date_div">
                    {formattedDate}
                  </div>
                  <div className="text-base flex flex-row-reverse ">
                    <FaTemperatureHigh />
                  </div>
                  <div className="text-2xl flex flex-row-reverse ">
                    <WiHumidity />
                  </div>
                </td>
                {orderedRegions.map((region, index) => (
                  <td className="py-2 px-3" key={index}>
                    {filteredData[formattedDate] && filteredData[formattedDate][region] ? (
                      <>
                        <WeatherIcon weatherType={filteredData[formattedDate][region].description} />
                        <div>{filteredData[formattedDate][region].dayTemp}°C</div>
                        <div>{Math.round(filteredData[formattedDate][region].pop * 100)}%</div>
                      </>
                    ) : '-'}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherTable;