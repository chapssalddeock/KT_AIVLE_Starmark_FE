import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
const { Content, Sider } = Layout;
import SocialListView from '../SocialListView/SocialListView';
import SocialSideBar from '../SocialSideBar/ScSideBar';
import HelpButton from '../Popover/HelpButton';
import { Wave } from "../../../styles/PageScroll_Emotion";
import 'animate.css';
export default function SocialContentArea() {
    const [searchQuery, setSearchQuery] = useState('');
    const MAX_HISTORY_LENGTH = 5;
    const [searchHistory, setSearchHistory] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchResult, setSearchResult] = useState('');
    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            return; // 검색어가 비어있으면 동작하지 않음
        }
        // 검색 로직 구현

        const updatedHistory = [searchQuery, ...searchHistory.slice(0, MAX_HISTORY_LENGTH - 1)];
        setSearchHistory(updatedHistory);
        setShowSuggestions(false);
        setSearchResult([searchQuery]); //배열 설정

    };
    const handleSuggestedItemClick = (value) => {
        setSearchQuery(value);
        handleSearch();
        setShowSuggestions(false);
        const updatedHistory = [value, ...searchHistory.slice(0, MAX_HISTORY_LENGTH - 1)];
        setSearchHistory(updatedHistory);
        setSearchResult([value]); //배열 설정



    };
    const handleSearchHistory = (query) => {
        handleSearch();
        const updatedHistory = [query, ...searchHistory.slice(0, MAX_HISTORY_LENGTH - 1)];
        setSearchHistory(updatedHistory);
        setSearchResult([query]); //배열 설정

    };
    return (

        <Layout style={{ marginTop: 2, }}>
            
            <Layout>
                <Sider width={300} style={{ color: "white", boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.1)' }}>
                    <SocialSideBar onSearch={handleSearch} onSuggestedItemClick={handleSuggestedItemClick} ToggleClick={handleSearchHistory} />
                </Sider>
                <Layout style={{ padding: '0 24px 24px', backgroundColor: "white" }}>
                    <div style={{ margin: '12px 0  ', }}>
                    </div>
                    <div style={{ borderTop: '1px solid #f0f0f0', marginBottom: '20px' }}></div>
                    {/* 바로 위 div는 회색선이라 보고 빼던가 넣던가 하기 */}
                    <Content style={{ padding: '0px', margin:'-1.5vw', position: 'relative' }}>
                        <h2 style={{marginLeft:'-65px', display: 'flex', justifyContent: 'center', fontFamily: 'KOTRA_GOTHIC' }}>User List</h2>
                        <SocialListView style={{position:'absolute'}} searchResult={searchResult} />
                        
                    </Content>
                    
                    <HelpButton page={'social'}/>
                    
                </Layout>
            </Layout>
        </Layout>
    );
};
