
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import Top from '@/components/top/Top';
import Post from '@/components/mapcom/Post';


const FestivalSearchPage = () => {

// 현재 페이지의 URL을 가져옵니다.
const url = new URL(window.location.href);

// pathname을 분리하여 배열로 만듭니다.
const pathParts = url.pathname.split('/').filter(part => part); // 빈 문자열을 제거합니다.

// 세 번째 부분 추출
const thirdPart = pathParts.length >= 3 ? decodeURIComponent(pathParts[2]) : null;

    const { searchType, searchValue } = useParams();

    const [festivalData, setfestivalData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20); // 페이지당 항목 수
  
    useEffect(() => {
        const fetchfestivalings = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/festivals/search', {
              params: { searchType, searchValue },
            });
            setfestivalData(response.data);
          } catch (error) {
            console.error('Error fetching festivalings', error);
          }
        };
    
        fetchfestivalings();
      }, [searchType, searchValue]);
  

  
    const totalPages = Math.ceil(festivalData.length / itemsPerPage);
  
    const getCurrentPageItems = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return festivalData.slice(startIndex, endIndex);
    };
  
    const nextPage = () => {
      setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
    };
  
    const prevPage = () => {
      setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };
  
  

    return (
        <div>
            <Top title='festival'/>
          
          <div className='mt-10 mx-auto max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
            <Typography
            variant='h5'
            className='mb-5'>
              "{thirdPart}" 검색 결과 : 총 {festivalData.length}개
              </Typography>
        
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
      

{getCurrentPageItems().map((festival) => (
  <Post post={festival} />

  ))}
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md focus:outline-none">이전</button>
          
          <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">다음</button>
        </div>
      </div>
      </div>
  );
};

export default FestivalSearchPage;