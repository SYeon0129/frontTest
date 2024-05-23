import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from '../mapcom/Post';

const BlogPosts = () => {
    // 상태 관리: 포스트, 전체 포스트, 페이지 번호, 로딩 상태, 검색 쿼리
    const [allPosts, setAllPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(21); // 페이지당 항목 수
    const [searchQuery, setSearchQuery] = useState('');

    // 축제 게시물을 가져오는 함수
    useEffect(() => {
        const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:8080/api/festivals/all');
    
            if (response.data) {
              setAllPosts(response.data);
            } else {
              console.error('Error fetching data: Response body structure is incorrect');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    const totalPages = Math.ceil(allPosts.length / itemsPerPage);

    const getCurrentPageItems = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return allPosts.slice(startIndex, endIndex);
    };
  
    const nextPage = () => {
      setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
    };
  
    const prevPage = () => {
      setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };

    const handlePageChange = (event) => {
      const pageNumber = Number(event.target.value);
      setCurrentPage(pageNumber);
    };

    // 검색 결과를 필터링합니다.
    const handleSearch = async () => {
      const apiUrl = `http://localhost:8080/api/festivals/all`;
  
      try {
          const response = await axios.get(apiUrl);
          const allData = response.data;

          // 검색 쿼리가 있을 때 전체 데이터에서 필터링합니다.
          if (searchQuery) {
              const lowerCaseQuery = searchQuery.toLowerCase();
              const filteredPosts = allData.filter(post => post.addr1.toLowerCase().includes(lowerCaseQuery));
              setPosts(filteredPosts);
          } else {
              // 검색 쿼리가 없는 경우 전체 데이터를 표시합니다.
              setPosts(allData);
          }
      } catch (error) {
          console.error('검색 중 오류가 발생했습니다:', error);
      }
    };

    const [searchType, setSearchType] = useState('title');
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="relative pt-2 lg:pt-2 min-h-screen">
            {/* 검색 바 */}
            <div className="bg-white rounded-md shadow-lg w-full md:w-1/3 mx-auto -mt-12 py-5 mb-10 grid grid-cols-4 gap-4 px-4">
              <select
                  className="rounded-md h-10 col-span-1 sm:col-span-1"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
              >
                  <option value="title">축제 이름</option>
                  <option value="addr1">지역</option>
              </select>

              <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="py-2 border rounded col-span-2 sm:col-span-2"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
              />

              <div className="mx-auto col-span-1 sm:col-span-1">
                  {/* 검색 버튼 */}
                  <Link to={`/FestivalSearchPage/${searchType}/${searchValue}`}>
                      <button
                          className="py-2 px-4 bg-green-500 text-white rounded"
                          onClick={handleSearch}
                      >
                          검색
                      </button>
                  </Link>
              </div>
          </div>

            {/* 포스트 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center max-w-2xl p-5 lg:max-w-7xl lg:px-8 mx-auto">
                {getCurrentPageItems().map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center mt-6">
                <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md focus:outline-none">이전</button>
                <select
                    value={currentPage}
                    onChange={handlePageChange}
                    className="w-16 px-4 py-2 border rounded text-center"
                >
                    {Array.from({ length: totalPages }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
                <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 ml-2 bg-green-500 text-white rounded-md focus:outline-none">다음</button>
            </div>
        </div>
    );
};

export default BlogPosts;
