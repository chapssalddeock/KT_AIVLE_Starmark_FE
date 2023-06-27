import { useState, useEffect, useRef } from 'react';

//import { FaSearch } from 'react-icons/fa';
import { Search } from 'react-bootstrap-icons';
import useGET from '../../axios/GET';

export default function SideBar({ onSearch, onSuggestedItemClick, ToggleClick }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const MAX_HISTORY_LENGTH = 5;
    const searchInputRef = useRef(null);
    const suggestedItemsRef = useRef(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showHiddenRecords, setShowHiddenRecords] = useState(false);
    const [tags, setTags] = useState([]);
    const { fetchData : getfetchData, data: getTagData, error: getTagError } = useGET();

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
        ;
        const updatedHistory = [searchQuery, ...searchHistory.slice(0, MAX_HISTORY_LENGTH - 1)];
        setSearchHistory(updatedHistory);
        setShowSuggestions(false);
        onSearch(searchQuery);
        setSearchQuery('');
    };

    const handleSuggestedItemClick = (value) => {
        setSearchQuery(value);
        handleSearch();
        setShowSuggestions(false);
        const updatedHistory = [value, ...searchHistory.slice(0, MAX_HISTORY_LENGTH - 1)];
        setSearchHistory(updatedHistory);
        onSuggestedItemClick(value);

    };

    // const items = ['수학', 'abc', 'def', 'fqw', 'vxcv', 'bgf', 'dfag', 'ax', 'uay', 'a안녕', '2a12312', 'a반가워요', 'aㅁㅁㄴㅇㅁㄴㅇ', 'a한찬규', 'a김채원', 'a박경덕', 'a김민성', 'a황소정', 'a정정해'];

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

    useEffect(() => {
        let timerId;

        if (searchQuery.trim() !== '') {
            timerId = setTimeout(() => {
                const filteredItems = tags.filter(
                    (item) => item.toLowerCase().startsWith(searchQuery.toLowerCase())
                );
                setFilteredItems(filteredItems);
            }, 100); // 1초의 딜레이 후에 자동완성 요청을 보냅니다.
        } else {
            setFilteredItems([]); // 검색어가 비어있을 경우 filteredItems를 초기화합니다.
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [searchQuery]);

    const handleSearchHistory = (query) => {
        handleSearch();
        const updatedHistory = [query, ...searchHistory.slice(0, MAX_HISTORY_LENGTH - 1)];
        setSearchHistory(updatedHistory);
        ToggleClick(query);
    };

    useEffect(() => {
        const fetchData = async () => {
            await getfetchData('/bookmark');
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        if (getTagData) {
            const tags = getTagData.map(item => item.tags).flat();
            const uniqueTags = [...new Set(tags)];
            setTags(uniqueTags);
            console.log('Tags:', tags);
        } else if (getTagError) {
            console.error(getTagError);
        }
    }, [getTagData, getTagError]);


    return (
        <div>
            <div className="sidebar">

                <div className="search-container">
                    <input className="search-input" type="text" placeholder="Search" value={searchQuery} onChange={handleSearchInput} ref={searchInputRef} />
                    <button className="search-button" type="button" onClick={handleSearch}>
                        <Search />
                    </button>
                </div>
                <div className="search-history-container">
                    <div className="search-history">
                        <div className="search-record-wrapper">
                            {searchHistory.slice(0, MAX_HISTORY_LENGTH).map((query, index) => (
                                <button key={index} className="search-record" onClick={() => handleSearchHistory(query)}>
                                    {query}
                                </button>
                            ))}
                        </div>
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

                <div className='sidebar-main'>
                    <footer className="sidebar-footer">
                        <div className="additional_menu mt-4 p-3">
                            <div className="links">
                                <a href="#">About</a>
                                <a href="#">개인정보보호방침</a>
                            </div>
                            <hr className="my-2 py-0 w-100" />
                            <span>&copy; 2023 Aivle, 11, 42</span>
                        </div>
                    </footer>
                </div>

            </div>
        </div>
    );

}
