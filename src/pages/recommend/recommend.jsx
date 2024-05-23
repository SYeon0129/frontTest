import React from 'react';
import RecommendBody from '@/components/recommendcom/RecommendBody';
import Top from "@/components/top/Top";
import { useParams } from 'react-router-dom';

export function Recommend() {  

  const  {selectedStartDate, selectedEndDate } = useParams();

  return (
    <div>
      <Top title='recommend' />
      <RecommendBody selectedMainStartDate={selectedStartDate} selectedMainEndDate={selectedEndDate}/>
    </div>
  );
};

export default Recommend;
