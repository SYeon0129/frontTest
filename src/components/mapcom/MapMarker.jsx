import React, { useEffect } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";

const MapMarker = ({ latitude, longitude}) => {
  
  useEffect(() => {
    // 지도 생성
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c87b1b56363f99ac8f96e46e2cefe04c`;
    document.head.appendChild(script);
    
    script.onload = () => {
      // Kakao 지도 API 로드 후 실행될 코드
      const mapContainer = document.getElementById('map'); // 지도를 표시할 div
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      const map = new window.kakao.maps.Map(mapContainer, options); // 지도 생성 및 객체 리턴

      const markerPosition = new window.kakao.maps.LatLng(latitude,longitude);

      const marker = new window.kakao.maps.Marker({
        position:markerPosition
      });

      marker.setMap(map);
    };

    return () => {
      // 컴포넌트가 언마운트 되면 스크립트 제거
      document.head.removeChild(script);
    };
  }, [latitude, longitude]); // 위도와 경도가 변경될 때마다 useEffect 재실행

  return <div id="map" className='w-full h-80 rounded-md '></div>;
};

export default MapMarker;
