import React from 'react';
import './RecommendMap.css'
import CampList from '../mapcom/RecommendCampList';

const RecommendCard = ({area}) => {
  return (
        <div>
        <CampList area={area}/>
        </div>
  );
};

export default RecommendCard;