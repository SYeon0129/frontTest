import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CampCard from './CampCard';

const LikedCamps = ({ memberEmail }) => {
    const [likedCamps, setLikedCamps] = useState([]);

    useEffect(() => {
        const fetchLikedCamps = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/camplikes/liked', {
                    params: { memberEmail }
                });
                setLikedCamps(response.data);
            } catch (error) {
                console.error("Error fetching liked camps", error);
            }
        };

        fetchLikedCamps();
    }, [memberEmail]);

    return (
        <div>
            <h2>Liked Camps</h2>
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

export default LikedCamps;
