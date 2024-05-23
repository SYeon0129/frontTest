import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageDisplay = ({ fileName }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/images/${fileName}`, { responseType: 'arraybuffer' });
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                );
                setImageSrc(`data:image/jpeg;base64,${base64}`);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [fileName]);

    return (
        <div>
            {imageSrc ? <img src={imageSrc} alt={fileName} /> : <p><img src="/img/camp/camp1.jpg" /></p>}
        </div>
    );
};

export default ImageDisplay;
