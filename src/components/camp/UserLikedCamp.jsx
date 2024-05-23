import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CampCard from './CampCard';

const UserLikedCamps = () => {
    const email = localStorage.getItem("id");
  const [likedCamps, setLikedCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedCamps = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/camplikes/user/${email}`);
        setLikedCamps(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedCamps();
  }, [email]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>찜한 캠핑장 목록</h2>
      <ul>
      {likedCamps.map(camp => (
            <CampCard
            key={camp.contentId}
            contentId={camp.contentId}
            firstImageUrl={camp.firstImageUrl ? camp.firstImageUrl : "img/camp/camp1.jpg"}
            facltNm={camp.facltNm}
            induty={camp.induty}
            lctCl={camp.lctCl}
            addr1={camp.addr1}
          />
                ))}
      </ul>
    </div>
  );
};

export default UserLikedCamps;
