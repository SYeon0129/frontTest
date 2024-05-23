import React from 'react';
import Top from "@/components/top/Top";
import RecommendCard from '@/components/recommendcom/RecommendCard';
import { useLocation } from 'react-router-dom';

export function RecommendList() {  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const region = searchParams.get('region');

    console.log(region)
  return (
    <div>
      <Top title={region} />
      
      <RecommendCard area={region} />
    </div>
  );  
};

export default RecommendList;