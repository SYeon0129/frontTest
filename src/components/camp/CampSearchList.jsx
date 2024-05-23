import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@material-tailwind/react';
import FilterComponent from './FilterComponent';
import '../mapcom/CampList.css';
import CampCard from './CampCard';

const CampSearchList = ({ searchType, searchValue }) => {
    const [campingData, setCampingData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20); // 페이지당 항목 수
    const [selectedNature, setSelectedNature] = useState("");
    const [selectedInduty, setSelectedInduty] = useState("");

    useEffect(() => {
        const fetchCampings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/camping/search', {
                    params: { searchType, searchValue },
                });
                setCampingData(response.data);
            } catch (error) {
                console.error('Error fetching campings', error);
            }
        };

        fetchCampings();
    }, [searchType, searchValue]);

    const filteredData = campingData.filter(camp => {
        const matchesNature = selectedNature ? camp.lctCl.includes(selectedNature) : true;
        const matchesInduty = selectedInduty ? camp.induty.includes(selectedInduty) : true;
        return matchesNature && matchesInduty;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    };

    const nextPage = () => {
        setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };

    const handleNatureFilterChange = (nature) => {
        setSelectedNature(prevNature => (prevNature === nature ? "" : nature));
        setCurrentPage(1); // Reset to first page
    };

    const handleIndutyFilterChange = (induty) => {
        setSelectedInduty(prevInduty => (prevInduty === induty ? "" : induty));
        setCurrentPage(1); // Reset to first page
    };

    return (
        <div className="relative pt-2 lg:pt-2 min-h-screen">
                  <div className='bg-white rounded-md shadow-lg w-full md:w-1/2 mx-auto -mt-20 py-5 max-w-xl px-5 min-w-xl'>
                {/* 필터 */}
                <div className='mx-auto'>
                    <FilterComponent
                        selectedNature={selectedNature}
                        selectedInduty={selectedInduty}
                        onNatureChange={handleNatureFilterChange}
                        onIndutyChange={handleIndutyFilterChange}
                    />
                </div>
            </div>

            <div className='max-w-2xl p-5 lg:max-w-7xl lg:px-8 mx-auto'>
                <Typography variant='h6' className='mb-5'>
                    총 {filteredData.length}개
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
                    {getCurrentPageItems().map((camp) => (
                        <CampCard
                            key={camp.contentId}
                            contentId={camp.contentId}
                            firstImageUrl={camp.firstImageUrl? camp.firstImageUrl : "/img/camp/camp1.jpg"}
                            facltNm={camp.facltNm}
                            induty={camp.induty}
                            lctCl={camp.lctCl}
                            addr1={camp.addr1}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md focus:outline-none">이전</button>
                <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">다음</button>
            </div>
        </div>
    );
};

export default CampSearchList;
