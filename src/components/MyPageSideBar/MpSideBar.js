import { useState, useEffect, useRef } from 'react';

import { Search } from 'react-bootstrap-icons';

export default function Mpsidebar() {
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
        setShowSuggestions(false);
        const updatedHistory = [value, ...searchHistory.slice(0, MAX_HISTORY_LENGTH - 1)];
        setSearchHistory(updatedHistory);

    };



    useEffect(() => {
        const items = ['abc', 'def', 'fqw', 'vxcv', 'bgf', 'dfag', 'ax', 'uay', 'a안녕', '2a12312', 'a반가워요', 'aㅁㅁㄴㅇㅁㄴㅇ', 'a한찬규', 'a김채원', 'a박경덕', 'a김민성', 'a황소정', 'a정정해'];
        const filteredItems = items.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
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
        handleSearch();
        setShowSuggestions(false); // 항목 선택 후 가시성 해제
        if (!searchHistory.includes(query)) {
            const updatedHistory = [query, ...searchHistory.slice(0, MAX_HISTORY_LENGTH - 1)];
            setSearchHistory(updatedHistory);
        }
    };
    return (
        <div>
            <div className="sidebar">

                

                <div className='sidebar-main'>
                    <footer className="sidebar-footer">
                        <div>Information</div>
                        <div>ABOUT US</div>
                        <div>이용약관</div>
                        <div>개인정보 취급방침</div>
                        <div>이메일 무단수집거부</div>
                        <div>CONTACT US</div>
                    </footer>
                </div>

            </div>
        </div>
    );
}