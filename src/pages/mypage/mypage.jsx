import MypageMain from '@/components/mypagecom/MypageMain';
import Top from "@/components/top/Top";
import React, { useState, useEffect } from 'react';

export function Mypage() {
  
  return (
    <div>
        <Top title='mypage' />
        <MypageMain />
    </div>
  );
};

export default Mypage;
