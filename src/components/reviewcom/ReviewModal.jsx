import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ReviewModal.css';
import ImageDisplay from './ImageDIsplay';
import { Typography } from '@material-tailwind/react';

const ReviewModal = ({ isOpen, onClose, review }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleBackgroundClick}>
        <div className="modal grid grid-cols-2 gap-5 p-10">
          <div className='col border-r pr-10'>
          <ImageDisplay fileName={review.imageFile} />
          </div>
          
          <div className='col grid grid-rows-5'>
            <div className='border-b'>
              <Typography
              variant='h5'>
                {review.facltNm}
              </Typography>
            </div>
            <div className='border-b'>
              <Typography
              variant='h4'
              >
              {review.title}
              </Typography>
            </div>
            <div className='row-span-3 overflow-y-auto'>
              <Typography
              variant='h6'
              >
                {review.content}
              </Typography>
            </div>
          </div>
        </div>
      </div>,
    document.body
  );
};

export default ReviewModal;
