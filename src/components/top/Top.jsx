// Top.jsx

import React from 'react';
import {
  Typography,
} from "@material-tailwind/react";
import { TopData } from '@/data/top';

const Top = ({ title }) => {

  const topItem = TopData.find(item => item.id === title);

  const regionNm = !topItem ? `${title}의 캠핑장 추천` : '';

  return (
    <div style={{ height: '50vh' }}>
      <div className="ml-auto mr-auto w-full px-4 text-center h-full" 
           style={{
             backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.45)),URL(${topItem ? topItem.imgSrc : "img/camp/camp1.jpg"})`,
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        <div className="relative flex h-full content-center items-center justify-center pt-20 pb-20">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full lg:w-12/12">
              <Typography
                variant="h3"
                color="white"
                className="font-White"
              >
                {topItem? topItem.name : regionNm}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
