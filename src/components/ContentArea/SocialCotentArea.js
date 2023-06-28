import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
const { Content, Sider } = Layout;
import SocialListView from '../SocialListView/SocialListView';
import SocialSideBar from '../SocialSideBar/ScSideBar';
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
        <Layout style={{ margin: 0, height: "calc(100vh - 76px)", }}>
            <Layout>
                <Sider width={300} style={{ color: "white", }}>
                    {/* 여기에 새로운 기능의 사이드바 */}
                    <SocialSideBar onSearch={handleSearch} onSuggestedItemClick={handleSuggestedItemClick} ToggleClick={handleSearchHistory}/>
                </Sider>
                <Layout style={{ padding: '0 24px 24px', }}>
                    <div style={{ margin: '16px 0  ', }}>
                        {/* 메뉴바 필요없으니 날림 */}
                    </div>
                    <Content style={{ padding: 24, margin: 0, }}>
                        <SocialListView searchResult={searchResult}/>
                        {/* 컨텐츠 영역에 들어갈 것은 소셜 리스트뷰로 따로 파야함 */}
                        {/* 소셜 리스트뷰에 유저 프사나 닉네임 누르면 Drawer 뜨게 하기 */}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
