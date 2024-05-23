import React from 'react';
import Recommend from '@/pages/recommend/recommend';
import OAuth2Callback from '@/components/signincom/OAuth2Callback';

const routes3 = [
    {
        path: "/recommend/:selectedStartDate/:selectedEndDate",
        element: <Recommend />,
    },
    {
        path: "/oauth2",
        element: <OAuth2Callback />,
      },
  
];

export default routes3;
