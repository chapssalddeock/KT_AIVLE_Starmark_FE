import { useState, useEffect, useRef } from 'react';

//import { FaSearch } from 'react-icons/fa';
import { Search } from 'react-bootstrap-icons';
import useGET from '../../AuthCommunicate/GET';

export default function SocialSideBar({ onSearch, onSuggestedItemClick, ToggleClick }) {
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
        setShowSuggestions(false);
    };
    const [config, setconfig] = useState({});
    useEffect(() => {
        let timerId;
        const delayShowSuggestions = () => {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
              setShowSuggestions(true); // 0.5초 후에 suggestions 보여줌
            }, 500);
          };
        const fetchData = async () => {
          const config = {
            params: {
              data: searchQuery,
              target: 'out',
            },
          };
      
          await getfetchData('/tag', config);
          delayShowSuggestions();
        };
      
        const delayFetchData = () => {
          clearTimeout(timerId);
          timerId = setTimeout(fetchData, 100);
        };
      
        delayFetchData();
      
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
    
    // useEffect(() => {
    //     const config = {
    //         params : {
    //             data: searchQuery,
    //         }
    //     }
    //     const fetchData = async () => {
    //         await getfetchData('/tag', config);
    //     };
    
    //     fetchData();
    //   }, []);
    
    
      
      useEffect(() => {
        if (getTagData) {
            // console.log('abc', getTagData)
            const tags = getTagData
            
            setTags(tags);
            // console.log('Tags:', tags);
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
                    {showSuggestions && searchQuery !== '' && (
                        <div id="suggestion-box">
                            {tags.map((item, index) => (
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
