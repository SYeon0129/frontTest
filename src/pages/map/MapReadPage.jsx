import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaTag, FaRegHeart } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { Typography } from '@material-tailwind/react';
import Top from "@/components/top/Top";
import MapMarker from '@/components/mapcom/MapMarker';
import SearchF from '@/components/mapcom/SearchF';
import ReviewWrite from '@/components/reviewcom/ReviewWrite';
import ReviewList from '@/components/reviewcom/ReviewList';
import CampLikeButton from '@/components/camp/CampLikeButton';
import './CampLikeButton.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const MapReadPage = () => {
  const { contentId } = useParams();
  const email = localStorage.getItem("id");
  const [campingData, setCampingData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/camping/${contentId}`);
        if (response.data) {
          setCampingData(response.data);
        } else {
          console.error('Error fetching data: Empty response');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [contentId]);

  const handleLike = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/camplike', {
        contentId: contentId,
        memberEmail: email // Replace with actual member email
      });

      if (response.status === 200) {
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error saving like:', error);
    }
  };

  if (!campingData) {
    return <div>Loading...</div>;
  }
  function ConditionalLi({ data }) {
    if (data.length === 0) {
      return null; // 길이가 0이면 null을 반환하여 아무것도 렌더링하지 않음
    } else{
      return <li>{data}</li>;
    }
  };
  

  return (
    <div>
      <Top title='mapread' />
      <div className="bg-white">
        {/* 사진 */}
        <div className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-5">
          <img
            src={campingData.firstImageUrl ? campingData.firstImageUrl : "img/camp/camp.jpg"}
            className="h-full w-full object-cover object-center"
            alt="Camping Site"
          />
        </div>
        {/* 이름 */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <Typography variant='h2'>
              {campingData.facltNm}
            </Typography>
          </div>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <div className='flex gap-5'>
              <div className='flex text-center'>
                <FaTag color='green'/>
                <Typography variant='h4' color='gray'>
                  {campingData.induty}
                </Typography>
              </div>
              <div className='flex text-center'>
                <FaTag color='green'/>
                <Typography variant='h4' color='gray'>
                  {campingData.lctCl}
                </Typography>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              {/* 리뷰 표시 로직 추가 */}
            </div>
            <div className="mt-10 flex text-center">
              <h3 className="sr-only">Address</h3>
              <FaLocationDot color='green'/>
              <p className='pl-2'>{campingData.addr1}</p>
            </div>
            <div className="mt-4 flex text-center">
              <h3 className="sr-only">Number</h3>
              <FaPhone color='green'/>
              <p className='pl-2'>{campingData.tel}</p>
            </div>
            <div className="mt-4 flex text-center">
              <h3 className="sr-only">Website</h3>
              <RiComputerFill color='green'/>
              <p className='pl-2 overflow-x-auto'><a href={campingData.homepage}>{campingData.homepage}</a></p>
            </div>
         
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">세부사항</h3>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                  <span className="text-gray-600">{campingData.manageSttus}</span>
                  {/* Add other details here */}
                </div>
              </div>

              <div className='mt-10 grid grid-cols-2 gap-3 mb-10'>
                <div
                  className="w-full text-center items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  <a href={campingData.homepage} className='w-full'>예약하러가기</a>
                </div>
                  <div className='flex w-full items-center justify-center font-medium rounded-md shadow-md hover:bg-blue-gray-50 hover:cursor-pointer'>
                  <CampLikeButton campId={contentId} memberemail={email} />
                  </div>
                
              </div>
              <ReviewList contentId={contentId} />
              <ReviewWrite contentId={contentId} />
     
          </div>
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">LineIntro</h3>
              <Typography variant='h4' color='green'>
                {campingData.lineIntro}
              </Typography>
            </div>
            <hr className='my-10'/>
            <div>
              <h3 className="sr-only">Description</h3>
              <Typography variant='h5' className='m-3' color='green'>
                캠핑장 소개
              </Typography>
              <div className="space-y-6 p-6 border-2 border-gray-100 rounded-lg">
                {campingData.intro}
              </div>
            </div>
            <hr className='my-10'/>
            <div className="mt-10">
              <Typography variant='h5' className='m-3' color='green'>
                특징
              </Typography>
              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <ConditionalLi data={campingData.glampInnerFclty} />
                  <ConditionalLi data={campingData.caravInnerFclty} />
                  <ConditionalLi data={campingData.operPdCl} />
                  <ConditionalLi data={campingData.glampInnerFclty} />
                  <ConditionalLi data={campingData.operDeCl} />
                  <ConditionalLi data={campingData.sbrsCl} />
                  <ConditionalLi data={campingData.posblFcltyCl} />
                  <ConditionalLi data={campingData.themaEnvrnCl} />
                </ul>
              </div>
            </div>
            <hr className='my-10'/>
            <div className="mt-10">
              <Typography
                variant='h5'
                className='m-3'
                color='green'
              >
                지도
              </Typography>
              <div className="mt-4 space-y-6">
                <MapMarker latitude={campingData.mapY} longitude={campingData.mapX}/>
                <p>{campingData.addr1}</p>
              </div>
            </div>
            <hr className='my-10'/>
            <div className="mt-10">
              <Typography
                variant='h5'
                className='m-3'
                color='green'
              >
                주변 관광지 및 지역 축제
              </Typography>
              <div>
                <SearchF searchData={campingData.sigunguNm}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapReadPage;