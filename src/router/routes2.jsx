import Mypage from '@/pages/mypage/mypage';
import RecommendList from '@/pages/recommend/recommendList';
import React from 'react';

const routes2 = [

    {
        id: 31,
        path: "/Mypage",
        element: <Mypage />,
      },
      
    {
      path: "/recommendList",
      element: <RecommendList />,
    },
  
];

export default routes2;
