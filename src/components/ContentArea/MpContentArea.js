import React, { useState } from 'react';
import MpSideBar from '../MyPageSideBar/MpSideBar';
import MyInfo from '../MypageMain/MyInfo'
import MyFollows from '../MypageMain/MyFollows';
import MyDashBoard from '../MypageMain/MyDashBoard';

import { Layout } from 'antd';
const { Content, Sider } = Layout;



export default function MpContentArea() {
    const [selectedItem, setSelectedItem] = useState('sub1');
    const handleMenuClick = (key) => {
        setSelectedItem(key);
    };


    return (
        <Layout style={{ marginTop: 2 }}>
            <Layout >
                <Sider width={300} style={{ color: "white", boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.1)' }}>
                    <MpSideBar handleMenuItemClick={handleMenuClick} />
                </Sider>
                <Layout style={{ padding: '0 24px 24px', backgroundColor: "white" }}>
                    <Content style={{ padding: 4, margin: 0, }}>
                        {selectedItem === 'sub1' && <MyInfo style={{ padding: 4, margin: 0, }} />}
                        {selectedItem === 'sub2' && <MyFollows style={{ padding: 4, margin: 0, }} />}
                        {selectedItem === 'sub4' && <MyDashBoard style={{ padding: 4, margin: 0, }} />}
                    </Content>
                </Layout>
            </Layout>
        </Layout >
    );
};

