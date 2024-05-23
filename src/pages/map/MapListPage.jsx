import CampingList from '@/components/camp/CampingList';
import Top from '@/components/top/Top';
import React from 'react';

const MapListPage = () => {
    return (
        <div>
            <Top title='camping' />
            <CampingList />
        </div>
    );
};

export default MapListPage;