import React from 'react';
import FestivalDetail from '@/components/festivalcom/FestivalDetail';
import FestivalSearchPage from '@/pages/festival/FestivalSearchPage';

const routes4 = [
    {
        path: "/detail/:contentid",
        element: <FestivalDetail />,
    },
    {
        path: "/FestivalSearchPage/:searchType/:searchValue",
        element: <FestivalSearchPage />,
      },

  
];

export default routes4;