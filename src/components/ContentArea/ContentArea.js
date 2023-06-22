import { Layout } from 'antd';
import React, { useState } from 'react';
const { Content, Sider } = Layout;
import ThumbnailView from '../ThumbnailView/ThumbnailView'
import ListView from '../ListView/ListView'
import SideBar from '../SideBar/SideBar'
import MenuBar from '../MenuButton/MenuButton';


export default function ContentArea() {

    const [viewMode, setViewMode] = useState('List'); // 초기값으로 'List' 설정

    // Segmented 변경 이벤트 핸들러
    const handleSegmentedChange = (value) => {
        setViewMode(value);
    };


    return (
        <Layout style={{ margin: 0, height: "calc(100vh - 76px)", }}>
            <Layout>
                <Sider width={300} style={{ color: "white" }}>
                    <SideBar />
                </Sider>
                <Layout style={{ padding: '0 24px 24px', }}>
                    <div style={{ margin: '16px 0  ', }}>
                        <MenuBar onSegmentedChange={handleSegmentedChange} />
                    </div>
                    <Content style={{ padding: 24, margin: 0, }}>
                        {viewMode === 'List' ? <ListView /> : <ThumbnailView />} {/* 조건에 따라 썸네일 뷰 또는 리스트 뷰 렌더링 */}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
