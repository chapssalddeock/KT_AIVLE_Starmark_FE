import { Layout } from 'antd';
import React, { useState, useEffect } from 'react';
const { Content, Sider } = Layout;
import ThumbnailView from '../ThumbnailView/ThumbnailView'
import ListView from '../ListView/ListView'
import SideBar from '../SideBar/SideBar'
import MenuBar from '../MenuButton/MenuButton';


export default function ContentArea() {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('List'); // 초기값으로 'List' 설정
    const [searchHistory, setSearchHistory] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchResult, setSearchResult] = useState('');

    const MAX_HISTORY_LENGTH = 5;

    // Segmented 변경 이벤트 핸들러
    const handleSegmentedChange = (value) => {
        setViewMode(value);
    };

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
                    <SideBar onSearch={handleSearch} onSuggestedItemClick={handleSuggestedItemClick} ToggleClick={handleSearchHistory} />
                </Sider>
                <Layout style={{ padding: '0 24px 24px', backgroundColor: "white" }}>
                    <div style={{ margin: '16px 0  ', }}>
                        <MenuBar onSegmentedChange={handleSegmentedChange} />
                    </div>
                    <div style={{ borderTop: '1px solid #f0f0f0', marginBottom: '12px' }}></div>
                    {/* 회색 선 추가 */}
                    <Content style={{ padding: 4, margin: 0, }}>
                        {viewMode === 'List' ? <ListView searchResult={searchResult} /> : <ThumbnailView searchResult={searchResult} />} {/* 조건에 따라 썸네일 뷰 또는 리스트 뷰 렌더링 */}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
