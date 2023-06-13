

import { useState, useEffect, useRef  } from 'react';
import styled from 'styled-components';

export default function TempBody() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const MAX_HISTORY_LENGTH = 5;
    const suggestedItemsRef = useRef(null);
    const [filteredItems, setFilteredItems] = useState([]);


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
        searchInputRef.current.focus(); // useRef를 사용하여 DOM 요소에 접근하여 포커스 설정
    };

    useEffect(() => {
        const items = ['abc', 'def', 'fqw', 'vxcv', 'bgf', 'dfg'];
        const filteredItems  = items.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredItems(filteredItems);
        // setShowSuggestions(filteredItems.length > 0);
        // const suggestedItemsElement = suggestedItemsRef.current; // ref로 요소 참조
        // suggestedItemsElement.innerHTML = '';

        /*const suggestedItems = items
            .filter((item) => item.startsWith(searchQuery))
            .map((item, index) => (
                <div key={index} className="item" onClick={() => handleSuggestedItemClick(item)}>
                  {item}
                </div>
            )); */
        
            // 추천 아이템 업데이트
        //setSuggestedItems(suggestedItems);
        // filteredItems.forEach((item) => {
        //     const suggestedItem = document.createElement('div');
        //     suggestedItem.className = 'item';
        //     suggestedItem.textContent = item;
        //     suggestedItem.addEventListener('click', () => handleSearchHistory(item));
        //     suggestedItemsElement.appendChild(suggestedItem);
        // });
        
    }, [searchQuery]);

        
    
    const handleSearchInput = (e) => {
        const input = e.target.value;
        setSearchQuery(input);
        setShowSuggestions(input !== '');
    };
    const handleSearchHistory = (query) => {
        setSearchQuery(query);
        setShowSuggestions(false); // 항목 선택 후 가시성 해제
    };
    

    return (
        <div>
            <div className="sidebar">

                <div class="search-container">
                    <input class="search-input" type="text" placeholder="Search" value={searchQuery} onChange={handleSearchInput} />                                        
                    <input class="search-button" type="image" src="/public/img/search_RG.jpg" alt = 'ss' onClick={handleSearch} />                                          
                </div>
                <div class="search-history">
                {searchHistory.slice(0, MAX_HISTORY_LENGTH).map((query, index) => (
                    <button key={index} class="search-record">{query}</button>
                ))}
                </div>
                {showSuggestions && (
                    <div id="suggestion_box">
                        {filteredItems.map((item, index) => (
                            <div
                                key={index}
                                className="suggested-item"
                                onClick={() => handleSuggestedItemClick(item)}
                            >
                                {item}
                            </div>
                        ))}
                        {/* <div id="suggested_items" ref={suggestedItemsRef}>
                            {filteredItems.map((item, index) => (
                                <div key={index} className="suggested-item" onClick={() => handleSuggestedItemClick(item)}>
                                    {item}
                                </div>
                            ))}
                        </div>  */}
                    </div>
                )}
                
                        

        
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
