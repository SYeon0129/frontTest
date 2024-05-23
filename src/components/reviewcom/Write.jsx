import { Typography } from "@material-tailwind/react";
import React, { useState } from 'react';

const Write = () =>{
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile) {
          console.log("Selected file:", selectedFile);
        }
      };

    return(
        <div>
            <div className="mb-5">
            <Typography
            variant="h4">
                캠핑장에 대한 리뷰를 남겨주세요!
            </Typography>
            </div>
            <div className="grid grid-rows-6 gap-5">
                <div className="flex gap-3 text-center">
                    <Typography
                    variant="h5">
                        캠핑장 검색
                    </Typography>
                    <input type="text" placeholder="캠핑장명 검색" className="border-blue-gray-300 border-2 rounded-sm"></input>
                    <button type="submit" className="bg-green-400 rounded-sm px-3 py-1 text-white">검색</button>
                </div>
                <div className="rounded-md border-2 border-gray">
                    <input type="text" placeholder="제목을 적어주세요" />
                </div>
                <div className="row-span-3 rounded-md border-2 border-gray">
                    <textarea className="h-full w-full p-5" placeholder="내용을 적어주세요"/>
                </div>
                <div className="flex">
                    <form onSubmit={handleSubmit}>
                        <input type="file" onChange={handleFileChange} />
                        <button type="submit">Upload</button>
                    </form>
                    {selectedFile && (
                        <div>
                        <h4>Selected file:</h4>
                        <p>{selectedFile.name}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Write;