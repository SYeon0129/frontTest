import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { GiCampingTent } from 'react-icons/gi';
import { BiSolidLandscape } from 'react-icons/bi';
import CampLikeButton from './CampLikeButton';

const CampCard = ({ contentId, firstImageUrl, facltNm, induty, lctCl, addr1 }) => {

  const email = localStorage.getItem("id");
  return (
    <div id='camp' className='rounded-md shadow-md p-3 grid grid-rows-7 gap-3'>
        <div className='row-span-4 overflow-hidden'>
        <Link key={contentId} to={`/MapReadPage/${contentId}`}>
          <img 
            src={firstImageUrl}
            className='h-full w-full object-cover rounded-sm' 
            alt={facltNm} 
          />
        </Link>
        </div>

        <div className='grid grid-cols-6 justify-between my-auto w-auto'>
          <div className='col-span-5'>
          <Typography variant='h5'>{facltNm}</Typography>
          </div>
          <div className='hover:cursor-pointer'>
          <CampLikeButton campId={contentId}  memberemail={email} />
          </div>
        </div>

          
            <div className='flex gap-3 my-auto row'>
              <Link key={contentId} to={`/MapReadPage/${contentId}`}>
              <div className='flex'>
                <GiCampingTent size={23}/>
                <p>{induty}</p>
              </div>
              <div className='flex'>
                <BiSolidLandscape size={20}/>
                <p>{lctCl}</p>
              </div>
              </Link>
            </div>
            
            <div className='my-auto row'>
            <Link key={contentId} to={`/MapReadPage/${contentId}`}>
              <Typography variant='h7' className='truncate'>{addr1}</Typography>
              </Link>
            </div>
        
      </div>
  );
}

export default CampCard;