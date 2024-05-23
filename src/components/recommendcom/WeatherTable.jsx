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
  const [recommendResult, setRecommendResult] = useState({});
  const [rankedRegions, setRankedRegions] = useState([]);

  useEffect(() => {
    setDates(getDates());
    if (selectedStartDate && selectedEndDate) {
      fetchWeatherData();
    }
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    if (weatherData.length > 0) {
      filterWeatherData();
    }
  }, [weatherData, dates]);

  useEffect(() => {
    if (Object.keys(recommendResult).length > 0) {
      mapRankedRegions();
    }
  }, [recommendResult]);

  const getDates = () => {
    const startDate = new Date(selectedStartDate);
    const endDate = new Date(selectedEndDate);
    const dates = [];

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date));
    }

    return dates;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}.${day}`;
  };

  const orderedRegions = [
    "서울/경기",
    "충청도",
    "전라도",
    "강원도",
    "경상도",
    "제주도",
  ];

  // const regionMapping = {
  //   6802827: "서울/경기",
  //   6811761: "충청도",
  //   1846355: "전라도",
  //   1843125: "강원도",
  //   1835650: "경상도",
  //   1846266: "제주도",
  // };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/weather/list', {
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      });

      // const resultResponse = await axios.post('http://localhost:8080/api/weather/abc1', {
      //   startDate: selectedStartDate,
      //   endDate: selectedEndDate,
      // });

      setWeatherData(response.data);
      // setRecommendResult(resultResponse.data);
      // console.log(resultResponse.data);
    } catch (error) {
      console.error("날씨 데이터를 가져오는데 실패했습니다.", error);
    }
  };

  // const mapRankedRegions = () => {
  //   const rankedRegions = Object.keys(recommendResult).map(rank => {
  //     const cityId = recommendResult[rank];
  //     return RegionMapping[cityId];
  //   });
  //   setRankedRegions(rankedRegions);
  // };

  const filterWeatherData = () => {
    const filtered = weatherData.reduce((acc, curr) => {
      const region = RegionMapping[curr.cityId];
      const date = new Date(curr.date);
      if (date >= new Date(selectedStartDate) && date <= new Date(selectedEndDate)) {
        if (!acc[curr.date]) {
          acc[curr.date] = {};
        }
        acc[curr.date][region] = {
          dayTemp: curr.dayTemp,
          pop: curr.pop,
          description: curr.description
        };
      }
      return acc;
    }, {});
    setFilteredData(filtered);
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
          {Object.entries(filteredData).map(([date, regions]) => (
            <tr key={date}>
              <td className="py-1 px-1">
                <div className="date_div">
                  {formatDate(date)}
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
                  {regions[region] ? (
                    <>
                      <WeatherIcon weatherType={regions[region].description} />
                      <div>{regions[region].dayTemp}°C</div>
                      <div>{Math.round(regions[region].pop * 100)}%</div>
                    </>
                  ) : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div>
        <h2>Recommended Regions</h2>
        <ol>
          {rankedRegions.map((region, index) => (
            <li key={index}>{index + 1}: {region}</li>
          ))}
        </ol>
      </div> */}
    </div>
  );
}

export default WeatherTable;