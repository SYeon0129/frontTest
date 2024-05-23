import Top from "@/components/top/Top";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import MapMarker from '@/components/mapcom/MapMarker';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const FestivalDetail = () => {
  const { contentid } = useParams();
  const [festivalData, setfestivalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/festivals/${contentid}`);

        if (response.data) {
          setfestivalData(response.data); // API 응답 전체를 저장
        } else {
          console.error('Error fetching data: Empty response ');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [contentid]);

  if (!festivalData) {
    return <div>Loading...</div>;
  }
  
  function ConditionalLi({ data }) {
    if (data.length === 0) {
      return null; // 길이가 0이면 null을 반환하여 아무것도 렌더링하지 않음
    }
  }

  return (
    <div>
      <Top title='festival' />

      <div className="bg-white">
        {/* 이름 */}
        <div className="mx-auto max-w-2xl px-4 pb-16 mt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          {/* 사진 */}
        <div className="mx-auto items-center">
          <img
            src={festivalData.firstimage ? festivalData.firstimage : "img/fes/fes.jpg"}
            className="h-full w-full object-cover object-center max-w-xl"
            alt="Camping Site"
          />
        </div>
          <div className="lg:border-l lg:border-gray-200 lg:pl-8">
            <Typography variant='h2'>
              {festivalData.title}
            </Typography>
         
            <div className="mt-10">
              <Typography variant='h5' color='green'>
              전화번호
              </Typography>
              <div className="mt-2">
              {festivalData.tel}
              </div>
            </div>

            <div className="mt-10">
              <Typography variant='h5' color='green'>
                개최기간
              </Typography>

              <div className="mt-2">
              {festivalData.eventstartdate} ~ {festivalData.eventenddate} 
              </div>
            </div>

            <div className="mt-10">
              <Typography variant='h5' color='green'>
                주소
              </Typography>

              <div className="mt-2">
              {festivalData.addr1}
              </div>
            </div>

<hr className='my-10'/>

      {/* 지도 */}
      <div className="mt-10">
            <Typography
              variant='h5'
              
              color='green'
              >
                지도
              </Typography>

              <div className="mt-4 space-y-6">
                  <MapMarker latitude={festivalData.mapy} longitude={festivalData.mapx}/>

              </div>
            </div>
            </div>

            </div>
          </div>
        </div>

  );
};

export default FestivalDetail;
