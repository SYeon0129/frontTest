import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Post from './Post';

const SearchF = ({ searchData }) => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://apis.data.go.kr/B551011/KorService1/searchFestival1?numOfRows=1000&pageNo=1&MobileOS=win&MobileApp=win&_type=json&arrange=Q&eventStartDate=20240501&serviceKey=tkpuYMyOJPiESQhzLecE1EshwjeUNeXfOJY7y8Rku7L2kh5E%2FbSH7NC7CZ1vvthRi72%2FidxEOUL%2FULnq0WWkHw%3D%3D`;
        const response = await axios.get(apiUrl);
        setAllData(response.data.response.body.items.item);
        setFilteredData(response.data.response.body.items.item);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchData && allData && allData.length > 0) {
        const filteredData = allData.filter(item => 
            item.addr1 && item.addr1.toLowerCase().includes(searchData.toLowerCase())
        );

        setFilteredData(filteredData);
    } else {
        setFilteredData([]);
    }
}, [searchData, allData]);

  return (
    <div>
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredData.map((festival) => (
              <Post post={festival} />
          ))}
          </div>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};


export default SearchF;
