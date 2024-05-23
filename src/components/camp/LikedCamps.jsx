import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
                    <li key={camp.likeId}>
                        {`Camp ID: ${camp.campId}, Liked Time: ${camp.likedTime}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LikedCamps;
