import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageDisplay from './ImageDIsplay';


const ReviewList = ( {contentId} ) => {
  const [reviewData, setreviewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // 페이지당 항목 수
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get(`http://localhost:8080/api/reviews/content/${contentId}`);


        if (response.data) {
          setreviewData(response.data);
        } else {
          console.error('Error fetching data: Response body structure is incorrect');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(reviewData.length / itemsPerPage);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return reviewData.slice(startIndex, endIndex);
  };

  const nextPage = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  };


  return (
  
        
    <div className="w-96 block mx-auto p-8 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
     
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {getCurrentPageItems().map((review) => (
            <div classname="p-5">
                <ImageDisplay fileName={review.imageFile} />
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{review.title}</h5>
          
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{review.content}</p>
             
            </div>
        ))}
        </div>
        
        <div className="flex justify-center mt-6">
          <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md focus:outline-none">이전</button>

          <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none">다음</button>
    
        
        </div>
      </div>
  );
};

export default ReviewList;
