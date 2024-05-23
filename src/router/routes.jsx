// routes.js 파일
import React, { Component } from 'react';
import Recommend from "../pages/recommend/recommend";
import Help from "../pages/help/help";
import Festival from '@/pages/festival/festival';

import Home from '@/pages/home/home';
// routes 임포트
import routes1 from './routes1'; 
import routes2 from './routes2';
import routes3 from './routes3';
import routes4 from './routes4';
import Review from '@/pages/review/review';

import MapListPage from '@/pages/map/MapListPage';

const routes = [
  {
    id: 1,
    path: "/home",
    element: <Home />,
  },
  {
    id: 2,
    name: "캠핑장 추천",
    path: "/recommend",
    element: <Recommend />,
  },
  {
    id: 6,
    name: "캠핑장",
    path: "/MapListPage",
    element: <MapListPage />,
  },
  {
    id: 3,
    name: "축제 정보",
    path: "/festival",
    element: <Festival />,
   
},

  {
    id: 5,
    name: "리뷰게시판",
    path: "/review",
    element: <Review />,
  },
  {
    id: 4,
    path: "/help",
    element: <Help />,
  },

  ...routes1, // routes1 배열을 routes 배열에 병합
  ...routes2,
  ...routes3,
  ...routes4,

];

export default routes;
