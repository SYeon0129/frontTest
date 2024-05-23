import { Typography } from "@material-tailwind/react";
import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";

const Left = ({ onButtonClick }) => {
    const email = localStorage.getItem("id");
    return(
        <div>
            {/* 사용자 정보 */}
            <div className='grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 text-center rounded-md shadow-md p-5'>
                <div className="m-auto">
                    <IoPersonCircleSharp className="text-green-500 w-10 h-10 md:w-20 md:h-20 lg:w-25 lg:h-25"/>
                </div>
                <div className='my-auto col-span-2'>
                    <Typography
                        variant='h6'
                    >
                    
                    </Typography>
                    <Typography
                        variant='h7'
                        color='gray'
                        className="overflow-visible"
                    >
                    {email} 님 환영합니다. 
                    </Typography>
                </div>
            </div>

            {/* 메뉴 */}
            <div className='row-span-3 text-center rounded-md shadow-md p-5 grid grid-rows-3 gap-2'>
                <button className="bg-green-50 my-auto rounded-md shadow-md p-6" onClick={() => onButtonClick('profile')}>내 정보 수정</button>
                <button className="bg-green-50 my-auto rounded-md shadow-md p-6" onClick={() => onButtonClick('favorite')}>찜한 캠핑장</button>
                <button className="bg-green-50 my-auto rounded-md shadow-md p-6" onClick={() => onButtonClick('review')}>작성한 리뷰</button>
            </div>
        </div>
    );
};

export default Left;