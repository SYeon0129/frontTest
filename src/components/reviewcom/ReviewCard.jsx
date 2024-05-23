import React, { useState } from 'react';
import ImageDisplay from './ImageDIsplay';
import ReviewModal from './ReviewModal';

const ReviewCard = ({review}) =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
    return(
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 p-5">
            <ImageDisplay fileName={review.imageFile} />
            <div className='mt-3'>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{review.title}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {review.content}
                    </p>
                    <button
                        onClick={openModal}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                        자세히 보기
                        <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                        </button>
            </div>
            <ReviewModal isOpen={isModalOpen} onClose={closeModal} review={review} />
        </div>

    );
};

export default ReviewCard;