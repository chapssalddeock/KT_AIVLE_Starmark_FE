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
        <Layout style={{ marginTop: 4, }}>
            <Layout>
                <Sider width={300} style={{ color: "white", }}>
                    <SocialSideBar onSearch={handleSearch} onSuggestedItemClick={handleSuggestedItemClick} ToggleClick={handleSearchHistory} />
                </Sider>
                <Layout style={{ padding: '0 24px 24px', }}>
                    <div style={{ margin: '16px 0  ', }}>
                    </div>
                    <Content style={{ padding: 24, margin: 0, }}>
                        <SocialListView searchResult={searchResult} />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
