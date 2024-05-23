import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewModal from './ReviewModal';

const MyReviewList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewData, setReviewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // 페이지당 항목 수
  const emails = localStorage.getItem('id');

  const openModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reviews/email/${emails}`);
        if (response.data) {
          setReviewData(response.data);
        } else {
          console.error('Error fetching data: Response body structure is incorrect');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [emails]);

  const handleDelete = async (reviewId) => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/reviews/delete/${reviewId}`);
        setReviewData(reviewData.filter(review => review.id !== reviewId));
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const totalPages = Math.ceil(reviewData.length / itemsPerPage);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return reviewData.slice(startIndex, endIndex);
  };

  return (
    <div>
      <table className='w-full'>
        <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='py-2'>제목</th>
            <th className='py-2'>내용</th>
            <th className='py-2'>날짜</th>
            <th className='py-2'>삭제</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageItems().map((review) => (
            <tr key={review.reviewId} className='border-b'>
              <td className='py-2 hover:cursor-pointer' onClick={() => openModal(review)}>
                {review.title}
              </td>
              <td className='py-2 hover:cursor-pointer' onClick={() => openModal(review)}>
                {review.content}
              </td>
              <td className='py-2'>
                {review.createdDate}
              </td>
              <td className='py-2'>
                <button
                  onClick={() => handleDelete(review.reviewId)}
                  className='text-red-500 hover:text-red-700'
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedReview && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={closeModal}
          review={selectedReview}
        />
      )}
    </div>
  );
};

export default MyReviewList;
