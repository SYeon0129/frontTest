import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@material-tailwind/react';
import FilterComponent from '../camp/FilterComponent';
import './CampList.css';
import CampCard from '../camp/CampCard';

const CampList = ({ area }) => {
  const [campingData, setCampingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [selectedNature, setSelectedNature] = useState("");
  const [selectedInduty, setSelectedInduty] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(area);
        const response = await axios.get(`http://localhost:8080/api/camping/list/${area}`);
        if (response.data) {
          setCampingData(response.data);
        } else {
          console.error('데이터를 가져오는데 오류가 발생했습니다: 응답 본문의 구조가 잘못되었습니다');
        }
      } catch (error) {
        console.error('데이터를 가져오는데 오류가 발생했습니다:', error);
      }
    };

    if (area) {
      fetchData();
    }
  }, [area]);

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

  const handleNatureFilterChange = (nature) => {
    setSelectedNature(prevNature => (prevNature === nature ? "" : nature));
    setCurrentPage(1); // Reset to first page
  };

  const handleIndutyFilterChange = (induty) => {
    setSelectedInduty(prevInduty => (prevInduty === induty ? "" : induty));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="relative pt-2 lg:pt-2 min-h-screen">
            <div className='bg-white rounded-md shadow-lg w-full md:w-1/2 mx-auto -mt-20 py-5 max-w-xl px-5 min-w-xl'>
      <FilterComponent
        selectedNature={selectedNature}
        selectedInduty={selectedInduty}
        onNatureChange={handleNatureFilterChange}
        onIndutyChange={handleIndutyFilterChange}
      />
      </div>

      <div className='max-w-2xl p-5 lg:max-w-7xl lg:px-8 mx-auto'>
      <Typography
      variant='h6'
      className='mb-5'>
        총 {filteredData.length}개
        </Typography>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {getCurrentPageItems().map((camp) => (
        <CampCard
          key={camp.contentId}
          contentId={camp.contentId}
          firstImageUrl={camp.firstImageUrl? camp.firstImageUrl : "img/camp/camp1.jpg"}
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
        <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none">다음</button>
      </div>
    </div>
  );
};

export default CampList;
