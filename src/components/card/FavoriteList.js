import axios from "axios";
import React, { useState,useEffect } from "react";
import { API_URLS } from "../../api/apiConfig";

function FavoriteList() {
  const member_id = localStorage.getItem('member_id');
  const [likedBooths, setLikedBooths] = useState([]);

  useEffect(() => {
    const fetchLikedBooths = async () => {
      if (! member_id ) return; // member_id가 없으면 호출하지 않음

      try {
        const response = await axios.get(`${API_URLS.BOOTH_LIKED_LIST}/${member_id}`);
        setLikedBooths(response.data);
      } catch (error) {
        console.error(error);
      } 
    };

    fetchLikedBooths();
  }, [member_id]);

  return (
    <div className="grid grid-cols-12 justify-center p-10">
      
      <div className="col-span-10">
        <h2 className="text-2xl text-center" style={{ marginBottom: "50px" }}>찜한 목록</h2> 
        
        {/* 찜목록 리스트 (이미지, 이벤트제목, 주최, 일시) */}
        <div className="favorite-events-container p-30" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "30px"}}>
          {likedBooths.map((booth) => (
            <div className="favorite-event border-2" style={{ padding: "10px", marginBottom: "10px", display: "flex", alignItems: "center", borderWidth: "3px", gap: "30px"}}>
              
              <img src={booth.imgPath} alt={booth.title} style={{ marginRight: "20px", width: "auto", height: "auto"}} />

              <div>
                <h3 style={{ marginBottom: "5px", whiteSpace: "nowrap" }}>부스 제목: {booth.title}</h3> 
                <p style={{ marginBottom: "5px" }}>주최: {booth.openerName}</p>
                <p style={{ marginBottom: "5px" }}>일시: {booth.date} {booth.startTime} ~ {booth.endTime}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default FavoriteList;