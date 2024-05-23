import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { GiCampingTent } from 'react-icons/gi';
import { BiSolidLandscape } from 'react-icons/bi';
import CampLikeButton from './CampLikeButton';

const CampCard = ({ contentId, firstImageUrl, facltNm, induty, lctCl, addr1 }) => {
  const email = localStorage.getItem("id");
  return (
    <Link key={contentId} to={`/MapReadPage/${contentId}`}>
      <div id='camp' className='rounded-md shadow-md p-3 grid grid-rows-7'>
        <div className='row-span-4 overflow-hidden'>
          <img 
            src={firstImageUrl}
            className='h-full w-full object-cover rounded-sm' 
            alt={facltNm} 
          />
        </div>
        
        <div className='flex justify-between my-auto'>
          <Typography variant='h5'>{facltNm}</Typography>
          <Typography variant='h6' color='yellow'>별점</Typography>
          <CampLikeButton campId={contentId}  memberemail={email} />
        </div>
        
        <div className='flex gap-3 my-auto'>
          <div className='flex'>
            <GiCampingTent size={23}/>
            <p>{induty}</p>
          </div>
          <div className='flex'>
            <BiSolidLandscape size={20}/>
            <p>{lctCl}</p>
          </div>
        </div>
        
        <div className='my-auto'>
          <Typography variant='h7' className='truncate'>{addr1}</Typography>
        </div>
      </div>
    </Link>
  );
}

export default CampCard;
