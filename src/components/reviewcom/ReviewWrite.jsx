import React, { useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-tailwind/react';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="block mt-4 max-w-4xl mx-auto p-8 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
      <div className="cursor-pointer p-2 " onClick={toggleAccordion}>
        <Typography
        variant='h3'>
          {title}
        </Typography>
        <Typography
        variant='h6'
        color='gray'
        className='py-3'>
          이 곳을 클릭해주세요.
        </Typography>
      </div>
      {isOpen && (
        <div className="p-2">
          {children}
        </div>
      )}
    </div>
  );
};

const ReviewWrite = ( {contentId} ) => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const username = localStorage.getItem("username");
  const emails = localStorage.getItem("id");
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [createdBy, setCreatedBy] = useState(username);
  const [email, setEmail] = useState(emails);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
  
      try {
        // 이미지 업로드 요청
        const uploadResponse = await axios.post('http://localhost:8080/api/images/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        // 이미지 업로드 성공, 리뷰 데이터에 이미지 정보 포함
        const savedImage = uploadResponse.data;
        const reviewData = {
          title,
          content,
          imageFile: savedImage.fileName, // 업로드된 이미지의 파일 경로를 사용
          createdBy,
          contentId,
          email
        };
  
        // 리뷰 데이터 전송
        const response = await axios.post('http://localhost:8080/api/reviews/create', reviewData);
        console.log('Review submitted:', response.data);
        // 성공 메시지 표시 또는 폼 초기화 등의 후속 조치
      } catch (error) {
        console.error('There was an error!', error);
      }
    } else {
      console.error('No image selected');
      // 이미지가 선택되지 않았다는 메시지 처리
    }
  };

  return (
    <Accordion title="리뷰작성">
      <div className="space-y-5">
        <input
          type='text'
          name='subject'
          placeholder='제목'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md py-2.5 px-4 border text-sm outline-green-500"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full rounded-md py-2.5 px-4 border text-sm outline-green-500"
        />
        <div className="justify-self-end">
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ width: '200px', height: 'auto', marginRight: '75px' }}
            />
          )}
        </div>
        <textarea
          name='message'
          placeholder='리뷰를 작성해주세요.'
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full rounded-md px-4 border text-sm pt-2.5 outline-green-500"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white bg-green-200 hover:bg-green-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full"
        >
          리뷰 작성
        </button>
      </div>
    </Accordion>
  );
};

export default ReviewWrite;
