import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import './Top.css'
import {
    Typography,
  } from "@material-tailwind/react";
import Search from './Search';



const Top = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '../../public/img/background/background-1.jpg',
    '../../public/img/background/background-4.jpg',
    '../../public/img/background/background-5.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const typedContainer = useRef(null);

  useEffect(() => {
    const strings = [" 오토캠핑.", " 글램핑.", " 카라반.", " 펜션."];

    const options = {
      strings: strings,
      typeSpeed: 80,
      backSpeed: 80,
      backDelay: 2000,
      startDelay: 1000,
      loop: true,
      showCursor: true,
    };

    const typed = new Typed(typedContainer.current, options);
    return () => {
      typed.destroy(); // 컴포넌트가 사라질 때 typed 인스턴스를 정리합니다.
    };
  }, []); // 처음 한 번만 실행하도록 빈 배열을 두 번째 인수로 전달합니다.
    return (
      
      <div className=" ml-auto mr-auto w-full h-6/6 px-4 text-center slideshow ">
      <div className="relative  h-screen content-center items-center justify-center pt-16 pb-32  inset-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center">
     
        
          <div className="flex flex-wrap  items-center" >
            <div className="ml-auto mr-auto w-full lg:w-12/12">
            <Typography
                variant="h1"
                color="white"
                className="mb-10 font-White"
              >
                            당신만을 위한<br />전국의 모든 {'\n'}
                            <span className="underline">
                            <span ref={typedContainer} className="typed-words"></span>
              </span>
              </Typography>
              <Search/>
            </div>
          </div>
        </div>
        {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`background-${index}`}
          className={index === currentIndex ? 'active' : ''}
        />
      ))}
    </div>
   
        
    );
};

export default Top;