import { Layout } from 'antd';
import React from 'react';
const { Content, Sider } = Layout;
import SocialListView from '../SocialListView/SocialListView';
import SocialSideBar from '../SocialSideBar/ScSideBar';
export default function SocialContentArea() {


    return (
        <Layout style={{ margin: 0, height: "calc(100vh - 76px)", }}>
            <Layout>
                <Sider width={300} style={{ color: "white", }}>
                    {/* 여기에 새로운 기능의 사이드바 */}
                    <SocialSideBar></SocialSideBar>
                </Sider>
                <Layout style={{ padding: '0 24px 24px', }}>
                    <div style={{ margin: '16px 0  ', }}>
                        {/* 메뉴바 필요없으니 날림 */}
                    </div>
                    <Content style={{ padding: 24, margin: 0, }}>
                        <SocialListView></SocialListView>
                        {/* 컨텐츠 영역에 들어갈 것은 소셜 리스트뷰로 따로 파야함 */}
                        {/* 소셜 리스트뷰에 유저 프사나 닉네임 누르면 Drawer 뜨게 하기 */}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
