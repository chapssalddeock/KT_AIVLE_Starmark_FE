

import { useState, useEffect, useRef  } from 'react';
import styled from 'styled-components';

export default function TempBody() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const MAX_HISTORY_LENGTH = 5;
    const searchInputRef = useRef(null);
    const suggestedItemsRef = useRef(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleMouseEnter = (item) => {
        setHoveredItem(item);
      };
    
    const handleMouseLeave = () => {
        setHoveredItem(null);
      };


    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            return; // 검색어가 비어있으면 동작하지 않음
        }
        // 검색 로직 구현
        console.log('검색 실행:', searchQuery);
        const updatedHistory = [searchQuery, ...searchHistory.slice(0, MAX_HISTORY_LENGTH - 1)];
        setSearchHistory(updatedHistory);
        setSearchQuery('');
        setShowSuggestions(false);
    };
    const handleSuggestedItemClick = (value) => {
        setSearchQuery(value);
        handleSearch();
    };



    useEffect(() => {
        const items = ['abc', 'def', 'fqw', 'vxcv', 'bgf', 'dfag', 'ax', 'uay',  'a안녕', '2a12312', 'a반가워요', 'aㅁㅁㄴㅇㅁㄴㅇ', 'a한찬규', 'a김채원', 'a박경덕', 'a김민성', 'a황소정', 'a정정해'];
        const filteredItems  = items.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredItems(filteredItems);
        
    }, [searchQuery]);
    useEffect(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, []);

        
    
    const handleSearchInput = (e) => {
        const input = e.target.value;
        setSearchQuery(input);
        setShowSuggestions(input !== '');
    };
    const handleSearchHistory = (query) => {
        setSearchQuery(query);
        handleSearch();
        setShowSuggestions(false); // 항목 선택 후 가시성 해제
    };
    

    return (
        <div>
            <div className="sidebar">

                <div class="search-container">
                    <input class="search-input" type="text" placeholder="Search" value={searchQuery} onChange={handleSearchInput} ref={searchInputRef} />                                        
                    <input class="search-button" type="image" src="/public/img/search_RG.jpg" alt = 'ss' onClick={handleSearch} />                                          
                </div>
                <div className="search-history-container">
                    <div class="search-history">
                    {searchHistory.slice(0, MAX_HISTORY_LENGTH).map((query, index) => (
                        <button key={index} class="search-record" onClick={() => handleSearchHistory(query)}>{query}</button>
                    ))}
                    </div>
                    {showSuggestions && (
                        <div id="suggestion-box">
                            {filteredItems.map((item, index) => (
                                <div key={index} className="suggested-item"
                                    onMouseEnter={() => handleMouseEnter(item)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleSuggestedItemClick(item)}
                                >{item}</div>
                            ))}
            
                    </div>
                    )}
                </div>
                
                <div className= 'sidebar-main'>

                </div>
                <footer className="sidebar-footer">
                    <p>여기는 사이드바 푸터 영역입니다.</p>
                </footer>
                
                        

        
            
            </div>

            <div class="main-content">
                <div class ='main-content-ig'style={{ border: "solid 1px black"}}>
                    <p>여기는 임시로 만든 바디 영역입니다.</p>
                    <p>필요없고 보여주기 식입니다....</p>
                </div>
            
            </div>
        </div>
    );
    
}
