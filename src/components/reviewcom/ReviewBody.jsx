import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageDisplay from './ImageDIsplay';
import ReviewCard from './ReviewCard';

const ReviewBody =() => {
  const [reviewData, setreviewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // 페이지당 항목 수
  const emails = localStorage.getItem("id");
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get(`http://localhost:8080/api/reviews/all`);
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

    return(
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mt-5 grid grid-cols-3 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {getCurrentPageItems().map((review) => (
              <ReviewCard review={review} />
        ))}

            </div>
            <div className="flex justify-center mt-6">
            <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md focus:outline-none">이전</button>
            <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none">다음</button>
          </div>
        </div>

    );
};

export default ReviewBody;