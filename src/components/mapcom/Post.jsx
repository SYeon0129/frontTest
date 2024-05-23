import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function formatDate(dateString) {
    // YYYYMMDD 형식의 문자열을 파싱하여 Date 객체 생성
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    
    // Date 객체 생성
    const date = new Date(year, parseInt(month, 10) - 1, day);
    
    // 년도, 월, 일을 YYYY-MM-DD 형식으로 변환
    const formattedDate = date.toISOString().split('T')[0];
    
    return formattedDate;
  };


const Post = ({ post }) => (
    <article className="bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border">
        {/* 축제 세부 정보를 보여주는 링크 */}
        <Link to={`/detail/${post.contentid}`} className="absolute top-0 right-0 left-0 bottom-0 opacity-0" />
        {/* 축제 이미지 */}
        <div className="relative mb-4 rounded-2xl">
            <img
                alt={post.title}
                className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                src={post.firstimage}
            />
            {/* 이미지 위의 축제 보러가기 버튼 */}
            <Link
                to={`/detail/${post.contentid}`}
                className="flex justify-center items-center bg-blue-700 bg-opacity-70 absolute top-0 left-0 w-full h-full text-white text-3xl rounded-2xl opacity-0 transition-all duration-300 group-hover:opacity-100"
            >
                축제 보러가기
                {/* 화살표 아이콘 */}
                <svg
                    className="ml-2 w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </svg>
            </Link>
        </div>
        {/* 축제 제목 */}
        <h3 className="font-medium text-xl leading-8">
            <Link className="block relative group-hover:text-red-700 transition-colors duration-200" to={`/detail/${post.contentid}`}>
                {post.title}
            </Link>
        </h3>
        {/* 축제 세부 정보 */}
        <div className="flex justify-between items-center pb-4">
            <div className="flex items-center">
                {/* 축제 이미지 */}
                <img alt={post.title} className="h-12 w-12 rounded-full object-cover" src={post.firstimage} />
                <div className="ml-3">
                    <p className="text-sm font-semibold">축제기간</p>
                    <p className="text-sm text-gray-500 flex">
                        {/* 시계 아이콘 */}
                        <svg
                            className="ml-1 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 6v6h4" />
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                        {/* formatDate 함수를 사용하여 날짜 형식 변환 */}
                        {formatDate(post.eventstartdate)} ~ {formatDate(post.eventenddate)}
                    </p>
                </div>
            </div>
            {/* 축제 주소 */}
            <div className="flex justify-end text-sm text-gray-500">
                {/* 지도 아이콘 */}
                <svg
                    className="ml-1 w-4 h-4"
                    fill="currentColor"
                    stroke="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 2.39 1.19 4.65 3.26 6.26C9.1 15.84 9.92 16.5 12 21c2.08-4.5 2.9-5.16 3.74-5.74C17.81 13.65 19 11.39 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {post.addr1}
            </div>
        </div>
    </article>
);

export default Post;
