import React from 'react';
import './WeatherIcons.css'; // CSS 파일을 import하여 스타일을 적용합니다.

const WeatherIcon = ({ weatherType }) => {
  let iconClass = ''; // 아이콘 클래스명을 저장할 변수

  // 전달된 날씨 유형에 따라 아이콘 클래스를 설정합니다.
  switch (weatherType) {
    case '01d':
    case '01n':
      iconClass = 'sunny';
      break;
    case '02d':
    case '02n':
      iconClass = 'mostlysunny';
      break;
    case 'mostlycloudy':
      iconClass = 'mostlycloudy';
      break;
    case '03n':
    case '03d':
    case '04d':
    case '04n':
      iconClass = 'cloudy';
      break;
    case '50d':
    case '50n':
      iconClass = 'fog';
      break;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      iconClass = 'rain';
      break;
    case '11d':
    case '11n':
      iconClass = 'tstorms';
      break;
    case 'sleet':
      iconClass = 'sleet';
      break;
    case 'flurries':
      iconClass = 'flurries';
      break;
    case '13d':
    case '13n':
      iconClass = 'snow';
      break;
    default:
      iconClass = ''; // 유효하지 않은 날씨 유형이면 빈 문자열로 설정합니다.
  }

  return (
    <div className="weatherIcon iconContainer">
      <div className={iconClass}>
        <div className="inner"></div>
      </div>
    </div>
  );
};

export default WeatherIcon;
