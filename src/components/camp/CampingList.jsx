import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import FilterComponent from './FilterComponent';
import '../mapcom/CampList.css';
import CampCard from './CampCard';

const CampingList = () => {
  const [campingData, setCampingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(21);
  const [selectedNature, setSelectedNature] = useState("");
  const [selectedInduty, setSelectedInduty] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/camping/all');
        if (response.data) {
          setCampingData(response.data);
        } else {
          console.error('Error fetching data: Response body structure is incorrect');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = campingData.filter(camp => {
    const matchesNature = selectedNature ? camp.lctCl.includes(selectedNature) : true;
    const matchesInduty = selectedInduty ? camp.induty.includes(selectedInduty) : true;
    return matchesNature && matchesInduty;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const nextPage = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  };

  const handlePageChange = (event) => {
    const pageNumber = Number(event.target.value);
    setCurrentPage(pageNumber);
  };

  const handleNatureFilterChange = (nature) => {
    setSelectedNature(prevNature => (prevNature === nature ? "" : nature));
    setCurrentPage(1); // Reset to first page
  };

  const handleIndutyFilterChange = (induty) => {
    setSelectedInduty(prevInduty => (prevInduty === induty ? "" : induty));
    setCurrentPage(1); // Reset to first page
  };

  const handleSearch = async () => {
    const apiUrl = `http://localhost:8080/api/camping/all`;
    
    try {
      const response = await axios.get(apiUrl);
      const allData = response.data;
  
      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filteredPosts = allData.filter(camp => camp.addr1.toLowerCase().includes(lowerCaseQuery));
        setPosts(filteredPosts);
      } else {
        setPosts(allData);
      }
    } catch (error) {
      console.error('검색 중 오류가 발생했습니다:', error);
    }
  };

  const [searchType, setSearchType] = useState('facltNm');
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <div className="relative pt-2 lg:pt-2 min-h-screen">
      <div className='bg-white rounded-md shadow-lg w-full md:w-1/2 mx-auto -mt-20 py-5 max-w-xl px-5 min-w-xl'>
        <div className='grid grid-cols-4 mx-auto gap-3 ml-3 mb-5'>
          <select
            className="rounded-md h-10 col-span-1 sm:col-span-1"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="facltNm">캠핑장 이름</option>
            <option value="addr1">지역</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="px-5 py-2 border rounded col-span-2 sm:col-span-2"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="mx-auto col-span-1 sm:col-span-1">
            <Link to={`/CampingSearchPage/${searchType}/${searchValue}`}>
              <button
                className="py-2 px-4 bg-green-500 text-white rounded"
                onClick={handleSearch}
              >
                검색
              </button>
            </Link>
          </div>
        </div>
        <div className='mx-auto'>
          <FilterComponent
            selectedNature={selectedNature}
            selectedInduty={selectedInduty}
            onNatureChange={handleNatureFilterChange}
            onIndutyChange={handleIndutyFilterChange}
          />
        </div>
      </div>
      <div className='max-w-2xl p-5 lg:max-w-7xl lg:px-8 mx-auto'>
        <Typography variant='h6' className='mb-5'>
          총 {filteredData.length}개
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {getCurrentPageItems().map((camp) => (
            <CampCard
              key={camp.contentId}
              contentId={camp.contentId}
              firstImageUrl={camp.firstImageUrl ? camp.firstImageUrl : "img/camp/camp1.jpg"}
              facltNm={camp.facltNm}
              induty={camp.induty}
              lctCl={camp.lctCl}
              addr1={camp.addr1}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md focus:outline-none">이전</button>
        <select
          value={currentPage}
          onChange={handlePageChange}
          className="w-16 px-4 py-2 border rounded text-center"
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 ml-2 bg-green-500 text-white rounded-md focus:outline-none">다음</button>
      </div>
    </div>
  );
};

export default CampingList;
