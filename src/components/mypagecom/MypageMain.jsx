import React, { useState } from 'react';
import Left from './MypageLeft';
import Profile from './Profile';
import MyReviewList from '../reviewcom/MyReviewList';
import UserLikedCamps from '../camp/UserLikedCamp';

const MypageMain = () => {
    const email = localStorage.getItem("id");     
    const [pageId, setPageId] = useState('profile');
    const handleButtonClick = (id) => {
        setPageId(id);
    };

    return (
       <div className='mx-auto max-w-2xl py-10 lg:max-w-7xl'>
            <div className="grid grid-cols-4 gap-x-5 mt-5">
                {/* 왼쪽 */}
                <div>
                    <Left onButtonClick={handleButtonClick}/>
                </div>
                {/* 오른쪽 */}
                <div className='col-span-3 p-6 text-center rounded-md shadow-md'>
                    {pageId === 'profile' && <Profile />}
                    {pageId === 'favorite' &&  <UserLikedCamps />}
                    {pageId === 'review' && <MyReviewList />}
                </div>
            </div>
       </div>
    );
};

export default MypageMain;