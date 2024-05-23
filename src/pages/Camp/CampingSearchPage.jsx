import React from 'react';
import { useParams } from 'react-router-dom';
import Top from '@/components/top/Top';
import CampSearchList from '@/components/camp/CampSearchList';

const CampingSearchPage = () => {

const { searchType, searchValue } = useParams();
  
    return (
        <div>
            <Top title='camping' />
            <CampSearchList searchType={searchType} searchValue={searchValue} />
      </div>
  );
};

export default CampingSearchPage;