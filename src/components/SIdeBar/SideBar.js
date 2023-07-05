import { useState, useEffect, useRef } from 'react';
import {Tag} from 'antd';
import { Search } from 'react-bootstrap-icons';
import useGET from '../../AuthCommunicate/GET';



export default function SideBar({ onSearch, onSuggestedItemClick, ToggleClick }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const MAX_HISTORY_LENGTH = 6;
    const searchInputRef = useRef(null);
    const suggestedItemsRef = useRef(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showHiddenRecords, setShowHiddenRecords] = useState(false);
    const [tags, setTags] = useState([]);
    const { fetchData: getfetchData, data: getTagData, error: getTagError } = useGET();

    const handleMouseEnter = (item) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            return; 
        }

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
              target: 'in' ,
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




    useEffect(() => {
        if (getTagData) {
            
            const tags = getTagData

            setTags(tags);
            
        } else if (getTagError) {
            console.error(getTagError);
        }
    }, [getTagData, getTagError]);


    return (
        <>

            <div className="sidebar">

                <div className="search-container">
                    <input className="search-input" type="text" style={{fontFamily: 'KOTRA_GOTHIC'}} placeholder="Search Tag for Bookmarks" value={searchQuery} onChange={handleSearchInput} ref={searchInputRef} />
                    <button className="search-button" type="button" onClick={handleSearch}>
                        <Search />
                    </button>
                </div>
                <div className="search-history-container">
                    <div className="search-history">
                        <div className="search-record-wrapper" >
                            {searchHistory.slice(0, MAX_HISTORY_LENGTH).map((query, index) => (
                                <Tag color="geekblue" key={index} className="search-record"
                                    style= {{display: 'flex', marginBottom:'3%', justifyContent: 'center', alignItems: 'center', width: '255px', fontFamily: 'KOTRA_GOTHIC', color: '#5eacf2', border: 'solid #5eacf2 0.5px' }} 
                                    onMouseEnter={() => handleMouseEnter(query)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleSearchHistory(query)}>
                                    {query}
                                </Tag>
                                
                            ))}
                        </div>
                    </div>
                    {showSuggestions && searchQuery !== '' && (
                        <div id="suggestion-box">
                            {tags.map((item, index) => (
                                <div key={index} className="suggested-item"
                                style={{fontFamily: 'KOTRA_GOTHIC'}}
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

        </>
    );

}
