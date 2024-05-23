import React, { useEffect, useState } from 'react';
import geojson from '@/data/sido';
import RegionData from '@/data/RegionData';
import axios from 'axios';
import RegionMapping from '@/data/RegionMapping';

const PollutionMap = ({ selectedStartDate, selectedEndDate }) => {

  const [selectedArea, setSelectedArea] = useState(null);
  const [rankedRegions, setRankedRegions] = useState([]);

  const onPopup = ({ region }) => {
    const url = `/recommendList?region=${region}`;
    PollutionMap.current = window.open(url, "_blank", "noopener,noreferrer");
    PollutionMap.current.param = { region };
  };

  useEffect(() => {
    fetchRecommendRegions();
  }, [selectedStartDate, selectedEndDate]);

  const fetchRecommendRegions = async () => {
    try {
      const resultResponse = await axios.post('http://localhost:8080/api/weather/abc1', {
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      });
      const rankedRegions = Object.keys(resultResponse.data).map(rank => {
        const cityId = resultResponse.data[rank];
        return RegionMapping[cityId];
      });
      setRankedRegions(rankedRegions);
    } catch (error) {
      console.error("추천 지역 데이터를 가져오는데 실패했습니다.", error);
    }
  };

  const colors = {
    first: '#6DD66D',
    second: '#FFC341',
    third: '#FF5A5A',
  };

  useEffect(() => {

    let data = geojson.features;

    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c87b1b56363f99ac8f96e46e2cefe04c`;
    document.head.appendChild(script);

    script.onload = () => {

      const mapContainer = document.getElementById('pollution-map');
      const mapOption = {
        center: new kakao.maps.LatLng(35.76732900792388,127.96189115993688),
        level: 13,
        draggable: false
      };

      const map = new kakao.maps.Map(mapContainer, mapOption);
      const infowindow = new kakao.maps.InfoWindow({ removable: true });

      let pollution = [];

      const displayArea = (coordinates, name, fillColor) => {
        let path = [];
        coordinates[0].forEach((coordinate) => {
          path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
        });

        let polygon = new kakao.maps.Polygon({
          map: map,
          path: path,
          strokeWeight: 2,
          strokeColor: '#004c80',
          strokeOpacity: 0.8,
          strokeStyle: 'solid',
          fillColor: fillColor,
          fillOpacity: 0.7,
        });

        const originalFillOpacity = 0.7;
        const hoverFillOpacity = 0.5;

        kakao.maps.event.addListener(polygon, 'mouseover', function () {
          polygon.setOptions({ fillOpacity: hoverFillOpacity });
        });

        kakao.maps.event.addListener(polygon, 'mouseout', function () {
          polygon.setOptions({ fillOpacity: originalFillOpacity });
        });

        kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
          setSelectedArea(name);
          const region = name.split(' ')[0]; // '도' 추출
          onPopup({ region });
          const content = '<div style="padding:2px;"><p><b>' + name + '</div>';
          infowindow.setContent(content);
          infowindow.setPosition(mouseEvent.latLng);
          infowindow.setMap(map);
        });
      };

      const updateMap = () => {
        data.forEach((val) => {
          let coordinates = val.geometry.coordinates;
          let name = val.properties.SIG_KOR_NM;
          let fillColor;

          if (name.includes('경기') || name.includes('서울') || name.includes('인천')) {
            if (rankedRegions[0].includes('서울') || rankedRegions[1].includes('서울')) {
              fillColor = colors.first;
            } else if (rankedRegions[2].includes('서울') || rankedRegions[3].includes('서울')) {
              fillColor = colors.second;
            } else if (rankedRegions[4].includes('서울') || rankedRegions[5].includes('서울')) {
              fillColor = colors.third;
            }
          } else if (name.includes('제주')) {
            if (rankedRegions[0].includes('제주') || rankedRegions[1].includes('제주')) {
              fillColor = colors.first;
            } else if (rankedRegions[2].includes('제주') || rankedRegions[3].includes('제주')) {
              fillColor = colors.second;
            } else if (rankedRegions[4].includes('제주') || rankedRegions[5].includes('제주')) {
              fillColor = colors.third;
            }
          } else if (name.includes('경남') || name.includes('대구') || name.includes('경북') || name.includes('부산') || name.includes('울산')) {
            if (rankedRegions[0].includes('경상') || rankedRegions[1].includes('경상')) {
              fillColor = colors.first;
            } else if (rankedRegions[2].includes('경상') || rankedRegions[3].includes('경상')) {
              fillColor = colors.second;
            } else if (rankedRegions[4].includes('경상') || rankedRegions[5].includes('경상')) {
              fillColor = colors.third;
            }
          } else if (name.includes('전남') || name.includes('광주') || name.includes('전북')) {
            if (rankedRegions[0].includes('전라') || rankedRegions[1].includes('전라')) {
              fillColor = colors.first;
            } else if (rankedRegions[2].includes('전라') || rankedRegions[3].includes('전라')) {
              fillColor = colors.second;
            } else if (rankedRegions[4].includes('전라') || rankedRegions[5].includes('전라')) {
              fillColor = colors.third;
            }
          } else if (name.includes('충남') || name.includes('세종') || name.includes('대전') || name.includes('충북')) {
            if (rankedRegions[0].includes('충청') || rankedRegions[1].includes('충청')) {
              fillColor = colors.first;
            } else if (rankedRegions[2].includes('충청') || rankedRegions[3].includes('충청')) {
              fillColor = colors.second;
            } else if (rankedRegions[4].includes('충청') || rankedRegions[5].includes('충청')) {
              fillColor = colors.third;
            }
          } else if (name.includes('강원')) {
            if (rankedRegions[0].includes('강원') || rankedRegions[1].includes('강원')) {
              fillColor = colors.first;
            } else if (rankedRegions[2].includes('강원') || rankedRegions[3].includes('강원')) {
              fillColor = colors.second;
            } else if (rankedRegions[4].includes('강원') || rankedRegions[5].includes('강원')) {
              fillColor = colors.third;
            }
          }

          displayArea(coordinates, name, fillColor);
        });
      };
      updateMap();
    };
  }, [rankedRegions]);

  return (
    <div id='total'>
      <div id="pollution-map" style={{ width: '100%', height: '550px' }} />
      {/* <div>
        <h2>Recommended Regions</h2>
        <ol>
          {rankedRegions.map((region, index) => (
            <li key={index}>{index + 1}: {region}</li>
          ))}
        </ol>
      </div> */}
    </div>
  );
};

export default PollutionMap;
