
import { useState } from 'react';
export default function TempBody() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const MAX_HISTORY_LENGTH = 5;
    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            return; // 검색어가 비어있으면 동작하지 않음
          }
    // 검색 로직 구현
        console.log('검색 실행:', searchQuery);
        const updatedHistory = [searchQuery, ...searchHistory.slice(0, MAX_HISTORY_LENGTH - 1)];
        setSearchHistory(updatedHistory);
        setSearchQuery('');
    };

    return (
        <div>
            <div className="sidebar">

                <div class="search-container">
                    <input class="search-input" type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />                                        
                    <input class="search-button" type="image" src="/public/img/search_RG.jpg" alt = 'ss' onClick={handleSearch} />                                          
                </div>
                <div class="search-history">
                {searchHistory.slice(0, MAX_HISTORY_LENGTH).map((query, index) => (
                    <button key={index} class="search-record">{query}</button>
                ))}
                </div>
                        

        
                <p>사이드바</p>
            </div>

            <div class="main-content">
                <div style={{ border: "solid 1px black"}}>
                    <p>여기는 임시로 만든 바디 영역입니다.</p>
                    <p>필요없고 보여주기 식입니다....</p>
                </div>
            </div>
        </div>
    );
}
