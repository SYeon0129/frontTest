// routes1.js 파일
import React from 'react';
import MapReadPage from "@/pages/map/MapReadPage";
import CampingSearchPage from '@/pages/Camp/CampingSearchPage';
import { SignIn, SignUp } from '@/pages';
import Logout from '@/components/signincom/Logout';


const routes1 = [

  {
    id: 12,
    path: "/MapReadPage/:contentId",
    element: <MapReadPage />,
  },
  {
    id: 13,
    path: "/CampingSearchPage/:searchType/:searchValue",
    element: <CampingSearchPage />,
  },
  
  {
    id: 14,
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    id: 15,
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    id: 16,
    path: "/Logout",
    element: <Logout />,
  },

  
];

export default routes1;
